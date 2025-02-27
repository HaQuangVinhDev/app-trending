import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/firebaseConfig';

interface Customer {
  name: string;
  email: string;
  phone: string;
  totalOrders?: number;
}

export default function CustomerManagement() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Lấy danh sách khách hàng từ Firestore
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersRef = collection(db, 'customers');
        const snapshot = await getDocs(customersRef);
        const customerList = snapshot.docs.map((doc) => ({
          email: doc.id, // ID là email trong Firestore
          ...doc.data(),
        })) as Customer[];
        console.log('Danh sách khách hàng từ Firestore:', customerList);
        setCustomers(customerList);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
      }
    };
    fetchCustomers();
  }, []);

  const renderCustomer = ({ item }: { item: Customer }) => (
    <TouchableOpacity
      style={styles.customerItem}
      onPress={() => {
        console.log(`Chuyển hướng đến CustomerDetail với ID: ${item.email}`);
        router.push({
          pathname: '/admin/screens/customer-detail/[id]',
          params: { id: item.email },
        });
      }}
    >
      <Text style={styles.customerName}>{item.name}</Text>
      <Text style={styles.customerEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quản lý khách hàng</Text>
      {customers.length === 0 ? (
        <Text>Đang tải danh sách khách hàng...</Text>
      ) : (
        <FlatList data={customers} renderItem={renderCustomer} keyExtractor={(item) => item.email} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  customerItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '500',
  },
  customerEmail: {
    fontSize: 14,
    color: '#666',
  },
});
