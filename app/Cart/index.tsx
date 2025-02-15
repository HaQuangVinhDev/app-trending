import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import type { Product } from '../data/productcart';
import Header from '../components/header';
import Footer from '../components/footer';

// Giả lập danh sách sản phẩm
const products: Product[] = [
  { id: '1', name: 'Product A', price: 100, description: 'This is Product A', image: 'imageA.png' },
  { id: '2', name: 'Product B', price: 200, description: 'This is Product B', image: 'imageB.png' },
  { id: '3', name: 'Product C', price: 300, description: 'This is Product C', image: 'imageC.png' },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tìm sản phẩm theo ID
    const foundProduct = products.find((p) => p.id === id) || null;
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };

    saveCart();
  }, [cartItems]);

  const addToCart = () => {
    if (!product) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.errorText}>Product not found</Text>
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
