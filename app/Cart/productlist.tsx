// components/ProductList.tsx
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

const products = [
  { id: 1, name: 'Product 1', price: 10, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: 20, image: 'https://via.placeholder.com/150' },
];

export default function ProductList() {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; image: string }[]>([]);

  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
    setCart([...cart, product]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      {products.map((product) => (
        <View key={product.id} style={styles.product}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Text>{product.name}</Text>
          <Text>${product.price}</Text>
          <Button title="Add to Cart" onPress={() => addToCart(product)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  product: { marginBottom: 20, alignItems: 'center' },
  image: { width: 100, height: 100, marginBottom: 10 },
});
