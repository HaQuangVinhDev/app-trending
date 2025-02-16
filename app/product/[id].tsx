import { FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import ProductItem from '../data/productitem';
import Header from '../components/header';

interface CartItem {
  productId: string;
  title: string;
  image: any;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

interface Review {
  id: string;
  productId: string;
  user: string;
  rating: number;
  comment: string;
}

const ProductDetail: FC = () => {
  const { id } = useLocalSearchParams();
  const product = ProductItem.find((item) => item.id.toString() === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    typeof product?.colors?.[0] === 'object' ? product.colors[0].code : '',
  );
  const [selectedSize, setSelectedSize] = useState(
    typeof product?.sizes?.[0] === 'object' ? product.sizes[0].name : '',
  );
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
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
    if (!product) return;

    // Kiểm tra xem đã chọn màu và kích thước chưa
    if (!selectedColor || !selectedSize) {
      Alert.alert('Error', 'Please select a color and size!');
      return;
    }

    // Kiểm tra xem size có còn hàng không
    const selectedSizeObj = product.sizes.find((size) => typeof size !== 'string' && size.name === selectedSize);
    if (selectedSizeObj && typeof selectedSizeObj !== 'string' && !selectedSizeObj.inStock) {
      Alert.alert('Error', `Size ${selectedSize} out of stock!`);
      return;
    }

    const newItem: CartItem = {
      productId: product.id.toString(),
      title: product.title,
      image: product.image,
      price: parseFloat(product.price.replace(/[^0-9.]/g, '')),
      quantity,
      color: selectedColor,
      size: selectedSize,
    };

    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cart = storedCart ? JSON.parse(storedCart) : [];

      const existingIndex = cart.findIndex(
        (item: CartItem) =>
          item.productId === newItem.productId && item.color === selectedColor && item.size === selectedSize,
      );

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
      <View style={styles.center}>
        <Text style={styles.errorText}>Product not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Image source={product.image} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${parseFloat(product.price.replace(/[^0-9.]/g, '')).toFixed(2)}</Text>

      {/* Chọn màu sắc */}
      <Text style={styles.optionTitle}>Select Color:</Text>
      <View style={styles.colorContainer}>
        {product.colors?.map((color, index) => {
          const colorCode = typeof color === 'object' ? color.code : color; // Lấy mã màu
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorOption,
                { backgroundColor: colorCode }, // Áp dụng màu nền
                selectedColor === (typeof color === 'object' ? color.name : color) && styles.selectedColor,
              ]}
              onPress={() => setSelectedColor(typeof color === 'object' ? color.name : color)}
            />
          );
        })}
      </View>
      {/* Chọn kích thước */}
      <Text style={styles.optionTitle}>Select Size:</Text>
      <View style={styles.sizeContainer}>
        {product.sizes?.map((size, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.sizeOption,
              selectedSize === (typeof size === 'object' ? size.name : '') && styles.selectedSize,
            ]}
            onPress={() => setSelectedSize(typeof size === 'object' ? size.name : '')}
          >
            <Text>{typeof size === 'object' ? size.name : size}</Text>
          </TouchableOpacity>
        ))}
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
};

const styles = StyleSheet.create({
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorOption: {
    width: 30, // Kích thước vòng tròn màu
    height: 30,
    borderRadius: 15, // Làm tròn thành hình tròn
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc', // Viền màu nhẹ
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: 'blue', // Viền xanh khi chọn
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 16 },
  image: { width: '100%', height: 300 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 20, fontWeight: 'bold', color: 'green' },

  sizeContainer: { flexDirection: 'row', marginVertical: 10 },
  sizeOption: { borderRadius: 5, padding: 10, borderWidth: 1, margin: 5 },
  optionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  selectedSize: { backgroundColor: '#a8a8a8', borderColor: '#a8a8a8', borderWidth: 1 },

  quantityContainer: { flexDirection: 'row', marginVertical: 10 },
  quantityButton: { padding: 10, borderWidth: 1 },
  quantityText: { fontSize: 18, marginHorizontal: 10 },
  quantityButtonText: { fontSize: 18, fontWeight: 'bold' },
  addToCartButton: { backgroundColor: 'blue', padding: 10, alignItems: 'center' },
  addToCartText: { color: 'white', fontSize: 18 },
  reviewSection: { marginTop: 20 },
  reviewTitle: { fontSize: 20, fontWeight: 'bold' },
  reviewItem: { borderBottomWidth: 1, paddingVertical: 8 },
  reviewUser: { fontWeight: 'bold' },
  reviewInput: { borderWidth: 1, padding: 8, marginVertical: 10 },
  reviewButton: { backgroundColor: 'green', padding: 10, alignItems: 'center' },
  reviewButtonText: { color: 'white', fontSize: 18 },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 20 },
  ratingContainer: { flexDirection: 'row', marginVertical: 10 },
  star: { fontSize: 24, color: '#ccc' },
  selectedStar: { color: 'gold' },
});

export default ProductDetail;
