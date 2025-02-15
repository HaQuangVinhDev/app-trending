import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const thumbnails: ImageSourcePropType[] = [
  require('~/assets/images/thumnail/consider1.webp'),
  require('~/assets/images/thumnail/consider2.webp'),
  require('~/assets/images/thumnail/consider3.webp'),
  require('~/assets/images/thumnail/consider4.webp'),
];

const ProductImage = ({
  mainImage,
  thumbnails,
}: {
  mainImage: ImageSourcePropType;
  thumbnails: ImageSourcePropType[];
}) => {
  const [currentImage, setCurrentImage] = useState<ImageSourcePropType>(mainImage);
  return (
    <View style={styles.container}>
      <Image source={currentImage} style={styles.mainImage} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>
        {thumbnails.map((thumb, index) => (
          <TouchableOpacity key={index} onPress={() => setCurrentImage(thumb)}>
            <Image source={thumb} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

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

const ProductInfo = () => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.productTitle}>Y2K Couple Personalized LED Night Light</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>$39.99 USD</Text>
        <Text style={styles.oldPrice}>$49.99 USD</Text>
        <Text style={styles.discountText}>20% OFF</Text>
      </View>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} filled={i < 4} />
        ))}
        <Text style={styles.reviewText}>746 reviews</Text>
      </View>
      <Text style={styles.productDescription}>
        Customize this unique couple night light with your names and a special message. Perfect for gifts or to
        celebrate your relationship.
      </Text>
    </View>
  );
};

const PaymentSection = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <View style={styles.paymentContainer}>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setQuantity(quantity + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductPage = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      <View style={{ alignItems: 'center' }}>
        <ProductImage mainImage={require('~/assets/images/thumnail/consider1.webp')} thumbnails={thumbnails} />
      </View>
      <View style={{ justifyContent: 'space-between', marginTop: 16 }}>
        <ProductInfo />
        <PaymentSection />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: '100%' },
  mainImage: { width: 300, height: 300, borderRadius: 10, marginBottom: 10 },
  thumbnailContainer: { flexDirection: 'row' },
  thumbnail: { width: 60, height: 60, borderRadius: 5, marginHorizontal: 5, borderWidth: 2, borderColor: '#ccc' },
  infoContainer: { paddingHorizontal: 16, alignItems: 'center' },
  productTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D3748', textAlign: 'center' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  currentPrice: { fontSize: 18, fontWeight: 'bold', color: '#38A169' },
  oldPrice: { textDecorationLine: 'line-through', color: '#A0AEC0', marginLeft: 8 },
  discountText: { color: '#E53E3E', marginLeft: 8 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  reviewText: { fontSize: 12, color: '#4A5568', marginLeft: 4 },
  productDescription: { color: '#4A5568', fontSize: 14, textAlign: 'center', marginTop: 8 },
  paymentContainer: { flexDirection: 'column', alignItems: 'center', gap: 16, width: 160 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  button: {
    width: 32,
    height: 32,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { fontSize: 18 },
  quantityText: { fontSize: 20 },
  addToCartButton: { backgroundColor: '#22C55E', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  addToCartText: { color: 'white', textAlign: 'center', fontSize: 16 },
});

export default ProductPage;
