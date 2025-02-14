import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
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
  {
    id: 7,
    name: 'Couple Custom Moon Phase',
    image: 'https://trendingcustom.com/cdn/shop/files/image_c7389e35-c690-4db2-9eff-c7a2f9228649_200x.png?v=1728358245',
  },
  {
    id: 8,
    name: 'Couple Custom Moon Phase',
    image: 'https://trendingcustom.com/cdn/shop/files/Group_34896_200x.png?v=1728357839',
  },
  {
    id: 9,
    name: 'Couple Custom Moon Phase',
    image: 'https://trendingcustom.com/cdn/shop/files/Group_34896_200x.png?v=1728357839',
  },
  {
    id: 10,
    name: 'Couple Custom Moon Phase',
    image: 'https://trendingcustom.com/cdn/shop/files/Group_34896_200x.png?v=1728357839',
  },
];

const renderItem = ({ item }: { item: Product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.productName}>{item.name}</Text>
    </View>
  );
};

export default function People() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>See what people are saying!</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all products →</Text>
        </TouchableOpacity>
      </View>

      <Carousel
        data={products}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.8}
        layout={'default'}
        loop={true}
      />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  seeAll: {
    color: 'blue',
    fontSize: 16,
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
