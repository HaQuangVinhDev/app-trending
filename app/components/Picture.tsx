import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const categories = [
  {
    id: '1',
    name: 'Music Fridge Magnet',
    image:
      'https://trendingcustom.com/cdn/shop/files/3c652c223e657d65757775736a7675683e2a292c153233302915181833352476757775737675757076717e72183022256a76692d3720656b65302e23332f657d767777776b6532292e33657d65373f656b6530222537657d3335322_400x.webp?v=1737437249',
  },
  {
    id: '2',
    name: 'Wooden Plaque',
    image:
      'https://trendingcustom.com/cdn/shop/files/3c652c223e657d65757775736a7776683d25127708702f300d3d1818757377767674777176767f183022256a75692d3720656b65302e23332f657d767777776b6532292e33657d65373f656b6530222537657d333532226b6533352_400x.webp?v=1737437367',
  },
  {
    id: '3',
    name: 'LED Night Light',
    image:
      'https://trendingcustom.com/cdn/shop/files/image-2_a07b00ee-57ca-4c35-a52b-e304948d7eab_400x.png?v=1736498998',
  },
  {
    id: '4',
    name: 'Post',
    image:
      'https://trendingcustom.com/cdn/shop/files/3c652c223e657d65757775736a777168050a280034150305023618187573777577717270777672183022256a73692d3720656b65302e23332f657d767777776b6532292e33657d65373f656b6530222537657d333532226b6533352_400x.webp?v=1737437563',
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
            <Image source={{ uri: item.image }} style={styles.image} />
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
