import { FC, useState, useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
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
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import ProductItem from '../data/productitem';
import Header from '../components/header';
import Question from '../components/quesion';
import Footer from '../components/footer';
import { Picker } from '@react-native-picker/picker';

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
  //xử lý imageMain
  const getImageSource = (image: any) => {
    if (typeof image === 'string') {
      return { uri: image }; // Nếu là string, dùng uri (ảnh từ Internet)
    }
    return image; // Nếu không, dùng require (ảnh nội bộ)
  };

  const [currentImage, setCurrentImage] = useState(getImageSource(product?.image));
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
    //
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
  const Star = ({ filled }: { filled: boolean }) => (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill={filled ? '#FFD700' : 'none'}
      stroke="#FFD700"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </Svg>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.imageMain}>
        {currentImage ? (
          <Image source={currentImage} style={styles.imageheader} />
        ) : (
          <Text style={{ textAlign: 'center', fontSize: 16 }}>No Image Available</Text>
        )}
        {/* Danh sách ảnh con (tạm thời dùng ảnh chính nếu không có danh sách ảnh con) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>
          {[product.image, ...(product?.thumbnails || [])].map((thumb, index) => (
            <TouchableOpacity key={index} onPress={() => setCurrentImage(getImageSource(thumb))}>
              <Image
                source={getImageSource(thumb)}
                style={[styles.thumbnail, currentImage === getImageSource(thumb) && styles.selectedThumbnail]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product?.title || 'No Title Available'}</Text>
          <Text style={styles.price}>Price: {product?.price || 'N/A'}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < 4} />
          ))}
          <Text style={styles.reviewText}>746 reviews</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Product Description</Text>
          <Text style={styles.contentText}>{product?.content || 'No content available for this product.'}</Text>
        </View>
      </View>

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
            <Text style={styles.colortext}>{typeof size === 'object' ? size.name : size}</Text>
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

      {/* thêm tên sản phẩm */}
      <View style={styles.inputContainer}>
        <Text>Woman's Name</Text>
        <TextInput style={styles.input} placeholder="Types here" />

        <Text>Man's Name</Text>
        <TextInput style={styles.input} placeholder="Types here" />
      </View>
      {/* Danh sách cơ sở */}
      <View style={styles.moreItemsContainer}>
        <Text style={styles.moreItemsTitle}>More Items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {moreItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.productImage} resizeMode="cover" />
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
  imageMain: { alignItems: 'center', width: '100%' },
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
    borderColor: 'blue',
    // Viền xanh khi chọn
  },
  colortext: {
    color: 'fff',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 16 },
  image: { width: '100%', height: 300 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 20, fontWeight: 'bold', color: 'green' },
  productTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },

  // size
  sizeContainer: { flexDirection: 'row', marginVertical: 10 },
  sizeOption: { borderRadius: 5, padding: 10, borderWidth: 1, margin: 5 },
  optionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  selectedSize: { backgroundColor: '#464ef8', borderColor: '#464ef8', borderWidth: 1 },
  quantityContainer: { flexDirection: 'row', marginVertical: 10, alignItems: 'center' },
  quantityButton: { padding: 10, borderWidth: 1, backgroundColor: '#f9f9f9', borderRadius: 5 },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
    padding: 8,
  },

  // add to cart
  addToCartButton: { backgroundColor: 'blue', padding: 10, alignItems: 'center' },
  addToCartText: { color: 'white', fontSize: 18 },
  // review
  reviewText: { fontSize: 12, color: '#4A5568', marginLeft: 4 },
  quantityButtonText: { fontSize: 18, fontWeight: 'bold' },
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
  productInfo: { paddingHorizontal: 10, marginTop: 20 },
  productName: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  priceContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, flexWrap: 'wrap' },
  salePrice: { fontSize: 14, fontWeight: 'bold', color: 'green', flexShrink: 1 },
  originalPrice: { fontSize: 12, textDecorationLine: 'line-through', color: '#999' },

  starRating: { fontSize: 14, color: 'gold' },
  reviewCount: { fontSize: 12, color: '#666', marginLeft: 5, marginTop: 2 },
  contentContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  imageheader: { width: 320, height: 320, resizeMode: 'contain', borderRadius: 10, marginBottom: 10 },
  thumbnailContainer: { flexDirection: 'row', marginTop: 10 },
  thumbnail: { width: 60, height: 60, marginHorizontal: 5, borderRadius: 5, borderWidth: 1, borderColor: '#ccc' },
  selectedThumbnail: { borderWidth: 1 },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  //input
  inputContainer: {
    paddingVertical: 30,
    gap: 10,
    opacity: 0.7,
  },
  //moduals
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  option: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
  },
});

export default ProductDetail;
