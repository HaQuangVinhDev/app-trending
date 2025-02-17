import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useCartCount() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          const cartItems = JSON.parse(storedCart);
          const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
          setCartCount(totalItems);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();

    // Lắng nghe thay đổi trong giỏ hàng
    const interval = setInterval(fetchCartCount, 1000);

    return () => clearInterval(interval);
  }, []);

  return cartCount;
}
