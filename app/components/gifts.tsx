import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Gift } from 'lucide-react-native';
import { Gifts } from '../data/gifts';

const BestSellers = () => {
  const { width } = useWindowDimensions();
  const numColumns = Math.floor(width / 150);

  const renderItem = ({
    item,
  }: {
    item: { id: number; image: any; name: string; price: number; originalPrice: number; reviews: number };
  }) => (
    <TouchableOpacity style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} />
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Gift color="#F04B23" size={24} />
          <Text style={styles.title}>Gifts for Couples</Text>
        </View>
        <Text style={styles.subtitle}>
          Celebrate love with personalized gifts made for couples. From heartfelt keepsakes to custom creations, find
          the perfect way to cherish their bond and create lasting memories.
        </Text>
      </View>

      <FlatList
        data={Gifts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
      />

      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See all products →</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    fontSize: 24,
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
  seeAllButton: {
    alignItems: 'center',
    marginTop: 24,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
});

export default BestSellers;
