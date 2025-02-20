import { View, Text, Image, StyleSheet, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '../data/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

type CartItem = {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};
interface Review {
  id: string;
  productId: string;
  user: string;
  rating: number;
  comment: string;
}

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === id);
  //More item
  const moreItems = [
    {
      id: '1',
      name: 'Product 1',
      price: 19.99,
      originalPrice: 29.99,
      image: require('~/assets/images/thumnail/consider1.webp'),
      reviews: 10,
    },
    {
      id: '2',
      name: 'Product 2',
      price: 24.99,
      originalPrice: 34.99,
      image: require('~/assets/images/thumnail/consider2.webp'),
      reviews: 8,
    },
    {
      id: '3',
      name: 'Product 1',
      price: 19.99,
      originalPrice: 29.99,
      image: require('~/assets/images/thumnail/consider3.webp'),
      reviews: 10,
    },
    {
      id: '4',
      name: 'Product 2',
      price: 24.99,
      originalPrice: 34.99,
      image: require('~/assets/images/thumnail/consider4.webp'),
      reviews: 8,
    },
    {
      id: '5',
      name: 'Product 1',
      price: 19.99,
      originalPrice: 29.99,
      image: require('~/assets/images/thumnail/consider5.webp'),
      reviews: 10,
    },
    {
      id: '6',
      name: 'Product 2',
      price: 24.99,
      originalPrice: 34.99,
      image: require('~/assets/images/thumnail/consider6.webp'),
      reviews: 8,
    },
  ];
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  // Load đánh giá từ AsyncStorage
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const storedReviews = await AsyncStorage.getItem('reviews');
        if (storedReviews) {
          const parsedReviews: Review[] = JSON.parse(storedReviews);
          setReviews(parsedReviews.filter((r) => r.productId === id));
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    };

    loadReviews();
  }, [id]);

  // Thêm đánh giá mới
  const addReview = async () => {
    if (newReview.trim() === '') {
      Alert.alert('Error', 'Please add review!');
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      productId: id as string,
      user: 'User', // Có thể thay bằng username thực tế nếu có hệ thống user
      rating,
      comment: newReview,
    };

    try {
      const storedReviews = await AsyncStorage.getItem('reviews');
      const updatedReviews = storedReviews ? JSON.parse(storedReviews) : [];
      updatedReviews.push(review);

      await AsyncStorage.setItem('reviews', JSON.stringify(updatedReviews));
      setReviews((prev) => [...prev, review]);
      setNewReview('');
      setRating(5);
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  // Hàm thêm vào giỏ hàng
  const addToCart = async () => {
    const quantity = 1; // Define the quantity variable
    if (!product) return;
    const newItem: CartItem = {
      productId: product.id.toString(),
      title: product.name,
      image: product.image,
      price: product.price,
      quantity,
    };

    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cart = storedCart ? JSON.parse(storedCart) : [];

      const existingIndex = cart.findIndex();

      if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push(newItem);
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert('Success', 'Added to cart!');
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };
  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.image} style={styles.productImage} resizeMode="cover" />
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.salePrice}>${product.price.toFixed(2)} USD</Text>
        <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)} USD</Text>
      </View>
      <Text style={styles.productDescription}>
        This is a detailed description of the product. Add more details here.
      </Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.starRating}>{'★'.repeat(Math.floor(product.rating))}</Text>
        <Text style={styles.reviewCount}>({product.reviews} reviews)</Text>
      </View>

      {/* Nút tăng/giảm số lượng */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {/* Nút Thêm vào giỏ hàng */}
      <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>

      {/* Danh sách cơ sở */}
      <View style={styles.moreItemsContainer}>
        <Text style={styles.moreItemsTitle}>More Items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {moreItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.Img} resizeMode="cover" />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.salePrice}>${item.price.toFixed(2)} USD</Text>
                  <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)} USD</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.starRating}>{Array(5).fill('★').join('')}</Text>
                  <Text style={styles.reviewCount}>({item.reviews})</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Danh sách đánh giá */}
      <View style={styles.reviewSection}>
        <Text style={styles.reviewTitle}>Reviews</Text>
        {reviews.length === 0 ? (
          <Text>No reviews yet. Be the first!</Text>
        ) : (
          reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <Text style={styles.reviewUser}>
                {review.user} ({review.rating}★):
              </Text>
              <Text>{review.comment}</Text>
            </View>
          ))
        )}

        {/* Thêm đánh giá mới */}
        <View style={styles.reviewSection}>
          <Text style={styles.optionTitle}>Your Rating:</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={[styles.star, rating >= star && styles.selectedStar]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.reviewInput}
            placeholder="Write a review..."
            value={newReview}
            onChangeText={setNewReview}
          />
          <TouchableOpacity onPress={addReview} style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  productImage: {
    width: '100%',
    height: 300,
    alignItems: 'center',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5fa436',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#8e8e93',
    marginLeft: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  starRating: {
    fontSize: 16,
    color: '#ffd700',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  addToCartButton: {
    padding: 15,
    backgroundColor: '#4078f2',
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
  },
  addToCartText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  moreItemsContainer: { marginTop: 20 },
  moreItemsTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  Img: { width: '100%', height: '100%' },
  productInfo: { alignItems: 'center', marginTop: 20 },
  productContainer: {
    marginRight: 15,
    marginLeft: 5, // Tạo khoảng cách với cạnh trái
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  reviewSection: { marginTop: 20, marginBottom: 20 },
  reviewTitle: { fontSize: 20, fontWeight: 'bold' },
  reviewItem: { borderBottomWidth: 1, paddingVertical: 8, marginBottom: 10 },
  reviewUser: { fontWeight: 'bold' },
  optionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  star: { fontSize: 24, color: '#ccc' },
  selectedStar: { color: 'gold' },
  reviewInput: { borderWidth: 1, padding: 8, marginVertical: 10 },
  reviewButton: { backgroundColor: 'green', padding: 10, alignItems: 'center' },
  reviewButtonText: { color: 'white', fontSize: 18 },
});
