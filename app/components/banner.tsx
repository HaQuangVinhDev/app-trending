import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function HeroSection() {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
        {' '}
        <Image style={styles.image} source={require('~/assets/images/banner.webp')} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', // Chiếm toàn bộ chiều rộng
    height: 200, // Điều chỉnh chiều cao phù hợp
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 12, // Bo tròn góc nhẹ
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
