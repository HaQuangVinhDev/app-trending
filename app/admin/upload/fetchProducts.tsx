import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/firebaseConfig'; // Firestore từ file cấu hình

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  reviews: number;
  rating: number;

  image: string;
};

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'product')); // Lấy dữ liệu từ collection "products"
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    return products;
  } catch (error) {
    console.error('🔥 Error fetching products:', error);
    return [];
  }
};

export default fetchProducts;
