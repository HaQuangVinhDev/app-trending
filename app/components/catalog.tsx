import { Fullscreen } from 'lucide-react-native';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const categories = [
  {
    title: 'For Her',
    image: require('~/assets/images/icon.png'),
  },
  {
    title: 'For Him',
    image: require('~/assets/images/I9rUKYrNvO__web1_400x.webp'),
  },
  {
    title: 'For Couples',
    image: require('~/assets/images/Group_34541_4_400x.png'),
  },
  {
    title: 'For Friends',
    image: require('~/assets/images/I9rUKYrNvO__web1_400x.webp'),
  },
  {
    title: 'For Siblings',
    image: require('~/assets/images/I9rUKYrNvO__web1_400x.webp'),
  },
  {
    title: 'For Pets',
    image: require('~/assets/images/I9rUKYrNvO__web1_400x.webp'),
  },
];

export default function CategoryGrid() {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        numColumns={2} // Có thể chỉnh thành 3 nếu muốn
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f5f1',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    margin: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
