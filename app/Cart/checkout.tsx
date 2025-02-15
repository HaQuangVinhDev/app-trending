import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Checkout() {
  const router = useRouter();

  const handlePayment = async () => {
    Alert.alert('Thanh toán thành công', 'Cảm ơn bạn đã mua hàng!');

    // Xóa giỏ hàng sau khi thanh toán thành công
    await AsyncStorage.removeItem('cart');
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.subtitle}>Vui lòng kiểm tra thông tin và thanh toán</Text>
      <Button title="Pay Now" onPress={handlePayment} color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 20 },
});
