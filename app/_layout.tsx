import { Slot, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { checkUserRole } from '../app/admin/utils/authService'; // Import kiểm tra quyền Admin

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const auth = getAuth();
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const adminStatus = await checkUserRole(firebaseUser);
        setIsAdmin(adminStatus);

        // 🔀 Điều hướng ngay khi xác định quyền
        if (adminStatus) {
          router.replace('/admin'); // Nếu là admin → chuyển đến admin
        } else {
          router.replace('/'); // Nếu là user thường → chuyển về trang chính
        }
      } else {
        setIsAdmin(false);
        router.replace('/'); // Nếu không đăng nhập → quay về trang chính
      }
    });

    return () => unsubscribe(); // Cleanup listener khi component bị unmount
  }, []);

  // Xử lý vuốt sang trái và phải
  const handleSwipe = (gestureName: string) => {
    if (gestureName === 'SWIPE_LEFT') {
      router.canGoBack(); // Chuyển đến trang tiếp theo
    } else if (gestureName === 'SWIPE_RIGHT') {
      if (router.canGoBack()) {
        router.back(); // Quay lại trang trước nếu có
      } else {
        router.push('/'); // Nếu không có trang trước, quay về trang chủ
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <GestureRecognizer
          onSwipeLeft={() => handleSwipe('SWIPE_LEFT')}
          onSwipeRight={() => handleSwipe('SWIPE_RIGHT')}
          config={{
            velocityThreshold: 0.5,
            directionalOffsetThreshold: screenWidth * 0.25, // Vuốt ít nhất 20% màn hình
          }}
          style={styles.gestureContainer}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="admin" />
            <Stack.Screen name="user" />
            <Stack.Screen name="bestsellermain" />
            <Stack.Screen name="thumbnail" />
          </Stack>
        </GestureRecognizer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Đảm bảo có màu nền khi safe area được áp dụng
  },
  gestureContainer: {
    flex: 1,
  },
});
