import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Product {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Our Moon Couple Gift Moon',
    image: require('~/assets/images/couplechair.png'),
  },
  {
    id: 2,
    name: 'Family Heart Tree Sitting',
    image: require('~/assets/images/cake.png'),
  },
  {
    id: 3,
    name: 'Our Moon Couple Gift Moon',
    image: require('~/assets/images/moon.png'),
  },
  {
    id: 4,
    name: 'Starry Night Couple Custom',
    image: require('~/assets/images/tivi.png'),
  },
  {
    id: 5,
    name: 'Always With You Cardinal',
    image: require('~/assets/images/cup.png'),
  },
  {
    id: 6,
    name: 'Couple Custom Moon Phase',
    image: require('~/assets/images/char.png'),
  },
];

const renderItem = ({ item }: { item: Product }) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.productName}>{item.name}</Text>
  </View>
);

export default function People() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>See what people are saying!</Text>
      </View>

      {/* FlatList thay thế Carousel */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => alert('See all products')}>
          <Text style={styles.seeAll}>See all products →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  seeAll: {
    color: 'blue',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: screenWidth * 0.8,
    marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
