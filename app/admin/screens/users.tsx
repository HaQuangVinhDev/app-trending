import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '~/firebaseConfig';

interface Customer {
  name: string;
  email: string;
  phone: string;
  totalOrders?: number;
}

export default function CustomerDetail() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // Xử lý id thành string
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);

  console.log('CustomerDetail - Params nhận được:', params); // Log toàn bộ params
  console.log('CustomerDetail - ID sử dụng:', id); // Log ID đã xử lý

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        if (!id) {
          console.log('ID không hợp lệ hoặc không được cung cấp!');
          Alert.alert('Lỗi', 'Không tìm thấy ID khách hàng.');
          return;
        }

        console.log(`Đang lấy dữ liệu từ Firestore với ID: ${id}`);
        const customerDoc = await getDoc(doc(db, 'customers', id));

        if (customerDoc.exists()) {
          const customerData = customerDoc.data() as Customer;
          console.log('Dữ liệu khách hàng tìm thấy:', customerData);
          setCustomer(customerData);
        } else {
          console.log(`Không tìm thấy khách hàng với ID: ${id}`);
          Alert.alert('Thông báo', 'Không tìm thấy khách hàng này.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải dữ liệu khách hàng.');
      }
    };
    fetchCustomer();
  }, [id]);

  const handleDelete = async () => {
    if (!id) {
      console.log('Không thể xóa: ID không hợp lệ!');
      Alert.alert('Lỗi', 'ID không hợp lệ!');
      return;
    }

    console.log(`Chuẩn bị xóa khách hàng với ID: ${id}`);
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa khách hàng này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'customers', id));
            console.log(`Đã xóa khách hàng với ID: ${id}`);
            Alert.alert('Thành công', 'Khách hàng đã được xóa!');
            router.back();
          } catch (error) {
            console.error('Lỗi khi xóa khách hàng:', error);
            Alert.alert('Lỗi', 'Không thể xóa khách hàng.');
          }
        },
      },
    ]);
  };

  if (!customer) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết khách hàng</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>
          Tên: <Text style={styles.value}>{customer.name}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{customer.email}</Text>
        </Text>
        <Text style={styles.label}>
          Số điện thoại: <Text style={styles.value}>{customer.phone}</Text>
        </Text>
        <Text style={styles.label}>
          Tổng đơn hàng: <Text style={styles.value}>{customer.totalOrders || 0}</Text>
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            console.log(`Chuyển hướng đến chỉnh sửa khách hàng với ID: ${id}`);
            router.push({
              pathname: '/admin/screens/customer-edit/[id]',
              params: { id },
            });
          }}
        >
          <Text style={styles.buttonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles giữ nguyên như file gốc
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  value: {
    fontWeight: '500',
  },
  actions: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
