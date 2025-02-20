import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';

import { useRouter } from 'expo-router';
import { products } from '../data/product';

export default function CategoryGrid() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const numColumns = Math.floor(width / 150);

  const renderItem = ({ item }: { item: (typeof products)[0] }) => {
    const fullStars = Math.floor(item.rating); // Số sao đầy đủ
    const halfStar = item.rating % 1 !== 0; // Kiểm tra có nửa sao không
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số sao rỗng

    return (
      <TouchableOpacity
        style={styles.productContainer}
        activeOpacity={0.7}
        onPress={() => router.push({ pathname: '/bestseller/[id]', params: { id: item.id.toString() } })}
      >
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.productImage} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.salePrice}>${item.price.toFixed(2)} USD</Text>
            <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)} USD</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.starRating}>
              {'★'.repeat(fullStars)}
              {halfStar ? '⭑' : ''}
              {'☆'.repeat(emptyStars)}
            </Text>
            <Text style={styles.reviewCount}>({item.reviews})</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>🔥 Best Sellers - Customer Favorites</Text>
        </View>
        <Text style={styles.subtitle}>Explore top-rated products loved by our customers!</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    marginBottom: 16,
    maxWidth: '48%',
  },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    marginTop: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  salePrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5fa436',
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#8e8e93',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starRating: {
    color: '#ffd700',
    fontSize: 12,
  },
  reviewCount: {
    fontSize: 10,
    color: '#666',
    marginLeft: 4,
  },
});
