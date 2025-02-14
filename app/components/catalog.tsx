import { Gift } from 'lucide-react-native';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const ITEM_SIZE = Math.floor((width - 32) / 2); // Trừ khoảng padding 16px x 2

const categories = [
  {
    title: 'For Her',
    image: require('~/assets/images/Group_34541_6_400x.avif'),
  },
  {
    title: 'For Him',
    image: require('~/assets/images/Group_34541_1_400x.avif'),
  },
  {
    title: 'For Couples',
    image: require('~/assets/images/Group_34541_2_400x.avif'),
  },
  {
    title: 'For Friends',
    image: require('~/assets/images/Group_34541_3_400x.avif'),
  },
  {
    title: 'For Siblings',
    image: require('~/assets/images/Group_34541_4_400x.avif'),
  },
  {
    title: 'For Pets',
    image: require('~/assets/images/Group_34541_5_400x.avif'),
  },
];

export default function CategoryGrid() {
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
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
    width: ITEM_SIZE,
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
    width: '100%',
    height: ITEM_SIZE,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
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
});
