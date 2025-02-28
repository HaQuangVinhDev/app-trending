// ProductsScreen.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '~/firebaseConfig';
import { Product } from '../data/product';
import { pickAndUploadImage } from '~/cloudinaryService';

// Component danh sách sản phẩm
const ProductList = ({
  products,
  onDeleteProduct,
}: {
  products: Product[];
  onDeleteProduct: (productId: string) => void;
}) => {
  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{item.rating} ★</Text>
          <Text style={styles.reviews}>({item.reviews} reviews)</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDeleteProduct(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderProduct}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContent}
    />
  );
};

// Component form thêm sản phẩm
const AddProductForm = ({ onAddProduct }: { onAddProduct: (product: Omit<Product, 'id'>) => void }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    reviews: '',
    rating: '',
    image: '',
  });

  const handleRatingChange = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    const ratingValue = parseFloat(numericValue);
    if (numericValue === '' || (ratingValue >= 0 && ratingValue <= 5)) {
      setNewProduct({ ...newProduct, rating: numericValue });
    }
  };

  const handleSubmit = async () => {
    const { name, price, originalPrice, reviews, rating } = newProduct;
    if (!name || !price || !originalPrice || !reviews || !rating) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const ratingValue = parseFloat(rating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      Alert.alert('Error', 'Rating must be between 0 and 5');
      return;
    }

    const priceValue = parseFloat(price);
    const originalPriceValue = parseFloat(originalPrice);
    const reviewsValue = parseInt(reviews);

    if (isNaN(priceValue) || priceValue < 0) {
      Alert.alert('Error', 'Price must be a positive number');
      return;
    }
    if (isNaN(originalPriceValue) || originalPriceValue < 0) {
      Alert.alert('Error', 'Original Price must be a positive number');
      return;
    }
    if (isNaN(reviewsValue) || reviewsValue < 0) {
      Alert.alert('Error', 'Reviews must be a positive integer');
      return;
    }

    const imageUrl = await pickAndUploadImage();
    if (!imageUrl) {
      Alert.alert('Error', 'Failed to upload image');
      return;
    }

    const productData: Omit<Product, 'id'> = {
      name,
      price: priceValue,
      originalPrice: originalPriceValue,
      reviews: reviewsValue,
      rating: ratingValue,
      image: imageUrl,
    };

    onAddProduct(productData);
    setNewProduct({ name: '', price: '', originalPrice: '', reviews: '', rating: '', image: '' });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Add New Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={newProduct.name}
        onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={newProduct.price}
        onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Original Price"
        value={newProduct.originalPrice}
        onChangeText={(text) => setNewProduct({ ...newProduct, originalPrice: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Reviews"
        value={newProduct.reviews}
        onChangeText={(text) => setNewProduct({ ...newProduct, reviews: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Rating (0-5)"
        value={newProduct.rating}
        onChangeText={handleRatingChange}
        keyboardType="numeric"
      />
      <Button title="Add Product" onPress={handleSubmit} color="#007AFF" />
    </View>
  );
};

// Component chính
export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'product'));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>),
      }));
      setProducts(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'product'), productData);
      setProducts([...products, { id: docRef.id, ...productData }]);
      Alert.alert('Success', 'Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this product?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            await deleteDoc(doc(db, 'product', productId));
            setProducts(products.filter((product) => product.id !== productId));
            Alert.alert('Success', 'Product deleted successfully');
          } catch (error) {
            console.error('Error deleting product:', error);
            Alert.alert('Error', 'Failed to delete product');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      <AddProductForm onAddProduct={handleAddProduct} />
      <ProductList products={products} onDeleteProduct={handleDeleteProduct} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#FFA500',
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
});
