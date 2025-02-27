import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '~/firebaseConfig';

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  reviews: number;
  rating: number;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = collection(db, 'product');

    // Lắng nghe thay đổi từ Firestore
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(updatedProducts);
      setLoading(false);
    });

    return () => unsubscribe(); // Hủy lắng nghe khi unmount
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>💰 ${item.price}</Text>
            <Text style={styles.originalPrice}>🔻 ${item.originalPrice}</Text>
            <Text style={styles.reviews}>
              ⭐ {item.rating} ({item.reviews} reviews)
            </Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: 'red',
  },
  reviews: {
    fontSize: 14,
    color: '#555',
  },
});

export default ProductList;
