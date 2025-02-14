import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Product {
  id: number;
  name: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Our Moon Couple Gift Moon',
    image: 'https://trendingcustom.com/cdn/shop/files/BWCix-K0p_mid_200x.png?v=1732518020',
  },
  {
    id: 2,
    name: 'Family Heart Tree Sitting',
    image: 'https://trendingcustom.com/cdn/shop/files/2_4704a7b3-6912-4c44-843c-7af2b85d3350_200x.png?v=1732518082',
  },
  {
    id: 3,
    name: 'Our Moon Couple Gift Moon',
    image: 'https://trendingcustom.com/cdn/shop/files/6_e17493d0-dc5e-42af-882b-16319f76fe59_200x.png?v=1732518147',
  },
  {
    id: 4,
    name: 'Starry Night Couple Custom',
    image: 'https://trendingcustom.com/cdn/shop/files/Group_34894_200x.png?v=1728357839',
  },
  {
    id: 5,
    name: 'Always With You Cardinal',
    image: 'https://trendingcustom.com/cdn/shop/files/Group_34895_200x.png?v=1728357839',
  },
  {
    id: 6,
    name: 'Couple Custom Moon Phase',
    image: 'https://trendingcustom.com/cdn/shop/files/Group_34896_200x.png?v=1728357839',
  },
];

const renderItem = ({ item }: { item: Product }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />
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
