import { View, Button, Alert } from 'react-native';
import { uploadProducts, uploadCustomers, uploadAllData } from '../utils/uploadData';

export default function SetupScreen() {
  const handleUploadProducts = async () => {
    try {
      await uploadProducts();
      Alert.alert('Thành công', 'Đã đẩy sản phẩm lên Firestore!');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đẩy sản phẩm lên Firestore.');
    }
  };

  const handleUploadCustomers = async () => {
    try {
      await uploadCustomers();
      Alert.alert('Thành công', 'Đã đẩy khách hàng lên Firestore!');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đẩy khách hàng lên Firestore.');
    }
  };

  const handleUploadAll = async () => {
    try {
      await uploadAllData();
      Alert.alert('Thành công', 'Đã đẩy tất cả dữ liệu lên Firestore!');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đẩy dữ liệu lên Firestore.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Button title="Đẩy sản phẩm" onPress={handleUploadProducts} />
      <Button title="Đẩy khách hàng" onPress={handleUploadCustomers} />
      <Button title="Đẩy tất cả" onPress={handleUploadAll} />
    </View>
  );
}
