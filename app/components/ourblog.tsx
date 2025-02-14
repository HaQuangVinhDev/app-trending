import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const Blog = [
  {
    title: 'Top 10 Customer Reviews: Heartfelt Experiences with Our Personalized Gifts-Feb 3 2025',
    date: 'February 02, 2025',
    link: '/blog/1',
    image: require('~/assets/images/Title_8eba078f-c0c8-43f2-8537-a56875fdd975_400x.avif'),
  },
  {
    title: 'Love in Every Detail: Swoon-Worthy Gifts for Your Valentine!',
    date: 'February 22, 2025',
    link: '/blog/2',
    image: require('~/assets/images/Valentines_6_d894d20b-11e6-466c-9918-bf1b531758d8_400x.webp'),
  },
  {
    title: 'Our Top Reviews from Last Week: Stories That Made Us Smile',
    date: 'February 19, 2025',
    link: '/blog/3',
    image: require('~/assets/images/Title_8eba078f-c0c8-43f2-8537-a56875fdd975_400x.avif'),
  },
  {
    title: 'Heartfelt 2025 Valentines Day Personalized Music Fridge Magnet Gift Guide - January 16th',
    date: 'February 15, 2025',
    link: '/blog/4',
    image: require('~/assets/images/Group_34541_1_400x.avif'),
  },
];

export default function OurBlog() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Our Blog</Text>
      <View style={styles.blogContainer}>
        {Blog.map((blog, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity onPress={() => router.push(blog.link as any)}>
              <Image source={blog.image} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.content}>
              <TouchableOpacity onPress={() => router.push(blog.link as any)}>
                <Text style={styles.blogTitle}>{blog.title}</Text>
              </TouchableOpacity>
              <Text style={styles.date}>{blog.date}</Text>
              <TouchableOpacity onPress={() => router.push(blog.link as any)}>
                <Text style={styles.readMore}>Read More</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  blogContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // Chia làm 2 cột
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 10,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  readMore: {
    fontSize: 14,
    color: 'blue',
    marginTop: 5,
  },
});
