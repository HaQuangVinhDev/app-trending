import { FC, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ProductItem from '../data/productitem';
import Header from '../components/header';

const ProductDetail: FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const productitem = ProductItem.find((item) => item.id === Number(id));
  const [currentImage, setCurrentImage] = useState(productitem?.image);
  const [quantity, setQuantity] = useState(1);

  console.log('Product Item:', productitem);

  if (!productitem) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const formatPrice = (priceString: string) => {
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  };

  const price = formatPrice(productitem?.price) || 0;
  const oldPrice = formatPrice(productitem?.oldPrice) || null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.imageContainer}>
        <Image source={currentImage} style={styles.mainImage} resizeMode="cover" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbnailContainer}>
          {[productitem.image].map((thumb, index) => (
            <TouchableOpacity key={index} onPress={() => setCurrentImage(thumb)}>
              <Image source={thumb} style={styles.thumbnail} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{productitem.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {oldPrice && <Text style={styles.oldPrice}>${oldPrice.toFixed(2)}</Text>}
        </View>
        <Text style={styles.reviews}>{productitem.reviews} reviews</Text>
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
        <TouchableOpacity onPress={() => router.push('/Cart/cart')} style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
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
    width: '90%',
    height: 320,
    borderRadius: 10,
    marginBottom: 10,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  oldPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  reviews: {
    fontSize: 16,
    color: '#555',
  },
  paymentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 10,
    minWidth: 40,
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ProductDetail;
