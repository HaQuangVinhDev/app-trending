import { collection, setDoc, doc, getDoc, addDoc } from 'firebase/firestore';
import { db } from '~/firebaseConfig';
import { ImageSourcePropType, Image } from 'react-native';
import { products } from '~/app/admin/data/product';
import { customers } from '~/app/admin/data/customers';

// Chuyển ảnh cục bộ thành tên file hoặc giữ nguyên URL
const getImageValue = (image: ImageSourcePropType | string) => {
  if (typeof image === 'string') return image;

  const asset = Image.resolveAssetSource(image);
  return asset.uri?.split('/').pop() ?? '';
};

// Hàm đẩy sản phẩm lên Firestore
export const uploadProducts = async () => {
  try {
    const productsRef = collection(db, 'product');

    for (const product of products) {
      const productDocRef = doc(productsRef, product.id);
      const existingDoc = await getDoc(productDocRef);

      if (existingDoc.exists()) {
        console.log(`⚠️ Product already exists: ${product.name}`);
        continue;
      }

      const imageValue = getImageValue(product.image);

      await setDoc(productDocRef, {
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        reviews: product.reviews,
        rating: product.rating,
        image: imageValue,
      });

      console.log(`✅ Added product: ${product.name}`);
    }

    console.log('✅ All products uploaded successfully!');
  } catch (error) {
    console.error('🔥 Error uploading products:', error);
    throw error; // Ném lỗi để xử lý bên ngoài nếu cần
  }
};

// Hàm đẩy khách hàng lên Firestore
export const uploadCustomers = async () => {
  try {
    const customersRef = collection(db, 'customers');

    for (const customer of customers) {
      const customerDocRef = doc(customersRef, customer.email); // Dùng email làm ID
      const existingDoc = await getDoc(customerDocRef);

      if (existingDoc.exists()) {
        console.log(`⚠️ Customer already exists: ${customer.name}`);
        continue;
      }

      await setDoc(customerDocRef, {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        totalOrders: customer.totalOrders || 0,
      });

      console.log(`✅ Added customer: ${customer.name} với ID: ${customer.email}`);
    }

    console.log('✅ All customers uploaded successfully!');
  } catch (error) {
    console.error('🔥 Error uploading customers:', error);
    throw error; // Ném lỗi để xử lý bên ngoài nếu cần
  }
};

// Hàm đẩy tất cả dữ liệu
export const uploadAllData = async () => {
  try {
    await uploadProducts();
    await uploadCustomers();
    console.log('✅ All data uploaded successfully!');
  } catch (error) {
    console.error('🔥 Error uploading all data:', error);
    throw error;
  }
};
