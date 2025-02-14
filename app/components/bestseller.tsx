import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Gift } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { products } from '../data/product';
const { width } = Dimensions.get('window');
const ITEM_MARGIN = 8;
const ITEM_SIZE = (width - ITEM_MARGIN * 3) / 2;

export default function CategoryGrid() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Gift size={24} color="#F04B23" />
        <Text style={styles.headerText}>Best Sellers - Customer Favorites</Text>
      </View>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { width: ITEM_SIZE }]}
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/data/product', params: { id: item.id } })}
          >
            <Image source={item.image} style={[styles.image, { height: ITEM_SIZE }]} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)} USD</Text>
            <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)} USD</Text>
            <Text style={styles.reviews}>
              ⭐ {item.rating} ({item.reviews})
            </Text>
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f5f1',
    paddingVertical: 16,
    paddingHorizontal: ITEM_MARGIN,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: ITEM_SIZE,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    overflow: 'hidden',
    margin: ITEM_MARGIN / 2,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    aspectRatio: 1, // Đảm bảo ảnh không bị méo, giữ tỷ lệ vuông
    resizeMode: 'cover',
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5fa436',
    marginTop: 4,
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#8e8e93',
  },
  reviews: {
    fontSize: 12,
    color: '#f39c12',
    marginTop: 4,
  },
});
