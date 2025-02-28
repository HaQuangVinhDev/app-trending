import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';

export default function ShippingMethodScreen() {
  const router = useRouter();
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const shippingMethods = [
    { id: '1', name: 'Standard Shipping', price: 5.0, estimated: '3-5 business days' },
    { id: '2', name: 'Express Shipping', price: 15.0, estimated: '1-2 business days' },
    { id: '3', name: 'Overnight Shipping', price: 25.0, estimated: 'Next day' },
  ];

  useEffect(() => {
    const loadShippingInfo = async () => {
      try {
        const storedInfo = await AsyncStorage.getItem('shippingInfo');
        if (storedInfo) {
          setShippingInfo(JSON.parse(storedInfo));
        }
      } catch (error) {
        console.error('Error loading shipping info:', error);
      }
    };
    loadShippingInfo();
  }, []);

  const handleSubmit = async () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a shipping method!');
      return;
    }

    const selectedShipping = shippingMethods.find((method) => method.id === selectedMethod);
    try {
      // Lưu phương thức vận chuyển vào AsyncStorage
      await AsyncStorage.setItem('shippingMethod', JSON.stringify(selectedShipping));
      Alert.alert('Success', `Selected ${selectedShipping?.name}. Proceeding to payment...`);
      router.push('/Cart/PaymentScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to save shipping method. Please try again.');
      console.error(error);
    }
  };

  const renderShippingMethod = ({ item }: { item: { id: string; name: string; price: number; estimated: string } }) => (
    <TouchableOpacity style={styles.methodItem} onPress={() => setSelectedMethod(item.id)}>
      <View style={styles.methodDetails}>
        <Checkbox
          value={selectedMethod === item.id}
          onValueChange={() => setSelectedMethod(item.id)}
          color={selectedMethod === item.id ? '#2ecc71' : undefined}
        />
        <View style={styles.methodText}>
          <Text style={styles.methodName}>{item.name}</Text>
          <Text style={styles.methodEstimated}>{item.estimated}</Text>
        </View>
      </View>
      <Text style={styles.methodPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping address</Text>
        {shippingInfo ? (
          <View style={styles.addressCard}>
            <Text style={styles.addressText}>
              {shippingInfo.firstName} {shippingInfo.lastName}
            </Text>
            <Text style={styles.addressText}>{shippingInfo.address}</Text>
            {shippingInfo.apartment && <Text style={styles.addressText}>{shippingInfo.apartment}</Text>}
            <Text style={styles.addressText}>
              {shippingInfo.city}, {shippingInfo.district}
            </Text>
            <Text style={styles.addressText}>{shippingInfo.phone}</Text>
            <TouchableOpacity onPress={() => router.push('/Cart/checkout')}>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noInfoText}>No shipping info provided.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping method</Text>
        <FlatList
          data={shippingMethods}
          keyExtractor={(item) => item.id}
          renderItem={renderShippingMethod}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Continue to payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
          <Text style={styles.returnButtonText}>Return to shipping info</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  addressCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  editLink: {
    fontSize: 14,
    color: '#0066cc',
    textAlign: 'right',
    marginTop: 8,
  },
  noInfoText: {
    fontSize: 16,
    color: '#666',
  },
  methodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodText: {
    marginLeft: 12,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  methodEstimated: {
    fontSize: 14,
    color: '#666',
  },
  methodPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2ecc71',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  returnButton: {
    padding: 16,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#0066cc',
    fontSize: 14,
  },
});
