import { signOut, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, type User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // ✅ Kiểm tra role từ Firestore
    const userRef = doc(db, 'users', userCredential.user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return { user: userCredential.user, isAdmin: userData.role === 'admin' };
    }

    return { user: userCredential.user, isAdmin: false };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Đăng ký user với role
export async function registerUser(email: string, password: string, firstName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Lưu thông tin user vào Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      firstName,
      email,
      role: 'user', // ✅ Mặc định role là "user"
    });

    // ✅ Ngay lập tức đăng xuất để tránh tự động đăng nhập
    await signOut(auth);

    return userCredential.user; // ✅ Trả về user nhưng đã đăng xuất
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function checkUserRole(user: User) {
  const token = await user.getIdTokenResult();
  return token.claims.admin === true;
}
