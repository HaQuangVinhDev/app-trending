import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const categories = [
  {
    id: '1',
    name: 'Music Fridge Magnet',
    image: require('~/assets/images/paren.png'),
  },
  {
    id: '2',
    name: 'Wooden Plaque',
    image: require('~/assets/images/wood.png'),
  },
  {
    id: '3',
    name: 'LED Night Light',
    image: require('~/assets/images/led.png'),
  },
  {
    id: '4',
    name: 'Post',
    image: require('~/assets/images/hand.png'),
  },
];

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 8;
const ITEM_SIZE = (width - ITEM_MARGIN * 3) / 2;

export default function Shopbycategory() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop by Category</Text>
      <Text style={styles.description}>
        Looking for custom ornaments or home decor? You’ll find the perfect gift for any occasion right here!
      </Text>

      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: ITEM_MARGIN,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    gap: 8,
    width: ITEM_SIZE,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 16,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: ITEM_SIZE,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
