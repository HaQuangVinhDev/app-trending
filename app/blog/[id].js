import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// Import danh sách blog
import BlogData from '../data/blog'; // Lưu Blog vào một file riêng nếu cần

export default function BlogDetail() {
  const { id } = useLocalSearchParams();
  const blog = BlogData.find((item) => item.id === id);

  if (!blog) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Blog not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={blog.image} style={styles.image} />
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.date}>{blog.date}</Text>
      <Text style={styles.content}>{blog.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: 'justify',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
