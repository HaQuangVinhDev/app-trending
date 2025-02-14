import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function ProductDetail() {
  const { id } = useLocalSearchParams(); // Lấy ID từ URL

  return (
    <View>
      <Text>Chi tiết sản phẩm: {id}</Text>
    </View>
  );
}
