import { FC, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

const ProductDetail: FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = ProductItem.find((item) => item.id.toString() === id);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentImage, setCurrentImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');

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

  const saveCart = async (updatedCart: CartItem[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = async () => {
    if (!product) return;

    const newItem: CartItem = {
      productId: product.id.toString(),
      title: product.title,
      image: product.image,
      price: parseFloat(product.price.replace(/[^0-9.]/g, '')),
      quantity,
      color: selectedColor,
      size: selectedSize,
    };

    let updatedCart = [...cartItems];
    const existingIndex = cartItems.findIndex(
      (item) => item.productId === newItem.productId && item.color === selectedColor && item.size === selectedSize,
    );

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push(newItem);
    }

    await saveCart(updatedCart);
    Alert.alert('Success', 'Added to cart!');
  };

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.imageContainer}>
        <Image source={currentImage} style={styles.mainImage} resizeMode="cover" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbnailContainer}>
          {[product.image].map((thumb, index) => (
            <TouchableOpacity key={index} onPress={() => setCurrentImage(thumb)}>
              <Image source={thumb} style={styles.thumbnail} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${parseFloat(product.price.replace(/[^0-9.]/g, '')).toFixed(2)}</Text>
          {product.oldPrice && (
            <Text style={styles.oldPrice}>${parseFloat(product.oldPrice.replace(/[^0-9.]/g, '')).toFixed(2)}</Text>
          )}
        </View>
        <Text style={styles.reviews}>{product.reviews} reviews</Text>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.optionTitle}>Select Color:</Text>
        <View style={styles.colorContainer}>
          {product.colors?.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorOption, selectedColor === color && styles.selectedColor]}
              onPress={() => setSelectedColor(color)}
            >
              <Text style={styles.colorText}>{color}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.optionTitle}>Select Size:</Text>
        <View style={styles.sizeContainer}>
          {product.sizes?.map((size, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.sizeOption, selectedSize === size && styles.selectedSize]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.paymentContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  reviews: {
    fontSize: 16,
    color: 'gray',
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  colorContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  colorOption: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginRight: 8,
  },
  selectedColor: {
    borderColor: 'blue',
  },
  colorText: {
    fontSize: 16,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sizeOption: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginRight: 8,
  },
  selectedSize: {
    borderColor: 'blue',
  },
  sizeText: {
    fontSize: 16,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  addToCartButton: {
    padding: 12,
    backgroundColor: 'blue',
    borderRadius: 4,
  },
  addToCartText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ProductDetail;
