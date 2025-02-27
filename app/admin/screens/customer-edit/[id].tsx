import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '~/firebaseConfig';

// Định nghĩa interface cho khách hàng
interface Customer {
  name: string;
  email: string;
  phone: string;
  totalOrders?: number;
}

export default function CustomerEdit() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // Xử lý id thành string
  console.log('CustomerEdit - ID:', id); // Thêm log để kiểm tra
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    totalOrders: 0,
  });

  // Lấy thông tin khách hàng từ Firestore
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        if (!id) {
          console.log('ID không hợp lệ!');
          return;
        }
        const customerDoc = await getDoc(doc(db, 'customers', id));
        if (customerDoc.exists()) {
          const data = customerDoc.data() as Customer;
          setCustomer(data);
          setForm({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            totalOrders: data.totalOrders || 0,
          });
        } else {
          console.log('Không tìm thấy khách hàng!');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
      }
    };
    fetchCustomer();
  }, [id]);

  // Cập nhật thông tin khách hàng
  const handleSave = async () => {
    if (!id) {
      Alert.alert('Lỗi', 'ID không hợp lệ!');
      return;
    }
    if (!form.name || !form.email || !form.phone) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      await updateDoc(doc(db, 'customers', id), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        totalOrders: form.totalOrders,
      });
      Alert.alert('Thành công', 'Thông tin khách hàng đã được cập nhật!');
      router.back(); // Quay lại màn hình trước (CustomerDetail)
    } catch (error) {
      console.error('Lỗi khi cập nhật khách hàng:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin khách hàng.');
    }
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa khách hàng</Text>
      </View>

      {/* Form chỉnh sửa */}
      <View style={styles.form}>
        <Text style={styles.label}>Tên:</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          placeholder="Nhập tên khách hàng"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder="Nhập email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Số điện thoại:</Text>
        <TextInput
          style={styles.input}
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Tổng đơn hàng:</Text>
        <TextInput
          style={styles.input}
          value={String(form.totalOrders)}
          onChangeText={(text) => setForm({ ...form, totalOrders: Number(text) || 0 })}
          placeholder="Nhập số đơn hàng"
          keyboardType="numeric"
        />
      </View>

      {/* Nút lưu */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  form: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
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
