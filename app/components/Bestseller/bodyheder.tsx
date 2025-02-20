import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { items } from '~/app/data/bestsell';

export default function BodyHeader() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const paginate = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const getImageSource = (image: any) => {
    if (typeof image === 'string') {
      return { uri: image }; // Nếu là string, dùng uri (ảnh từ Internet)
    }
    return image; // Nếu không, dùng require (ảnh nội bộ)
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={currentItems}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id.toString() } })}
          >
            <Image source={getImageSource(item.image)} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>
              {item.price} <Text style={styles.oldPrice}>{item.oldPrice}</Text>
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Phân trang */}
      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          <Text style={[styles.pageButton, currentPage === 1 && styles.disabled]}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>
          {currentPage} / {totalPages}
        </Text>
        <TouchableOpacity onPress={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          <Text style={[styles.pageButton, currentPage === totalPages && styles.disabled]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: '#f3f3f4',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  price: {
    color: '#6fbc8e',
    fontWeight: 'bold',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#f3f3f4',
    borderRadius: 6,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  pageNumber: {
    fontSize: 16,
  },
});
