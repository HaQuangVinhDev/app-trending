import { FC, useState, useEffect } from 'react';
import { SvgUri } from 'react-native-svg';
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
import Question from '../components/quesion';
import Footer from '../components/footer';

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
      <View style={styles.moreItemsContainer}>
        <Text style={styles.moreItemsTitle}>More Items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {moreItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.productImage} resizeMode="contain" />
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

      <Text style={styles.reviewSection}>
        <Question />
      </Text>
      <Text style={styles.reviewSection}>
        <Footer />
      </Text>
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

  quantityContainer: { flexDirection: 'row', marginVertical: 10, alignItems: 'center' },
  quantityButton: { padding: 10, borderWidth: 1, backgroundColor: '#f9f9f9', borderRadius: 5 },
  quantityText: {
    fontSize: 18,

    marginHorizontal: 10,

    padding: 8,
  },
  quantityButtonText: { fontSize: 18, fontWeight: 'bold' },
  addToCartButton: { backgroundColor: 'blue', padding: 10, alignItems: 'center' },
  addToCartText: { color: 'white', fontSize: 18 },
  reviewSection: { marginTop: 20, marginBottom: 20 },
  reviewTitle: { fontSize: 20, fontWeight: 'bold' },
  reviewItem: { borderBottomWidth: 1, paddingVertical: 8, marginBottom: 10 },
  reviewUser: { fontWeight: 'bold' },
  reviewInput: { borderWidth: 1, padding: 8, marginVertical: 10 },
  reviewButton: { backgroundColor: 'green', padding: 10, alignItems: 'center' },
  reviewButtonText: { color: 'white', fontSize: 18 },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 20 },
  ratingContainer: { flexDirection: 'row', marginVertical: 10 },
  star: { fontSize: 24, color: '#ccc' },
  selectedStar: { color: 'gold' },

  moreItemsContainer: { marginTop: 20 },
  moreItemsTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  productContainer: {
    marginRight: 15,
    marginLeft: 5, // Tạo khoảng cách với cạnh trái
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: { width: 100, height: 100, borderRadius: 10, overflow: 'hidden' },
  productImage: { width: '100%', height: '100%' },
  productInfo: { paddingLeft: 10, width: 120, justifyContent: 'center' },
  productName: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  priceContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, flexWrap: 'wrap' },
  salePrice: { fontSize: 14, fontWeight: 'bold', color: 'green', flexShrink: 1 },
  originalPrice: { fontSize: 12, textDecorationLine: 'line-through', color: '#999' },

  starRating: { fontSize: 14, color: 'gold' },
  reviewCount: { fontSize: 12, color: '#666', marginLeft: 5, marginTop: 2 },
});

export default ProductDetail;
