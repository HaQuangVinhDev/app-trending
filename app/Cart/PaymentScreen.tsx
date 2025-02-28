import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';

export default function PaymentScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [shippingMethod, setShippingMethod] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentMethods = [
    { id: '1', name: 'Credit/Debit Card' },
    { id: '2', name: 'PayPal' },
    { id: '3', name: 'Cash on Delivery (COD)' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        const shipping = await AsyncStorage.getItem('shippingInfo');
        const method = await AsyncStorage.getItem('shippingMethod');

        if (cart) setCartItems(JSON.parse(cart));
        if (shipping) setShippingInfo(JSON.parse(shipping));
        if (method) setShippingMethod(JSON.parse(method));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethod?.price || 0;
  const total = subtotal + shippingCost;

  const handleSubmit = async () => {
    if (!selectedPayment) {
      Alert.alert('Error', 'Please select a payment method!');
      return;
    }

    try {
      await AsyncStorage.removeItem('cart');
      await AsyncStorage.removeItem('shippingInfo');
      await AsyncStorage.removeItem('shippingMethod');

      Alert.alert('Success', 'Order placed successfully!');
      router.push('/');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const renderPaymentMethod = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity style={styles.paymentItem} onPress={() => setSelectedPayment(item.id)}>
      <Checkbox
        value={selectedPayment === item.id}
        onValueChange={() => setSelectedPayment(item.id)}
        color={selectedPayment === item.id ? '#2ecc71' : undefined}
      />
      <Text style={styles.paymentName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Information</Text>
        {shippingInfo ? (
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              {shippingInfo.firstName} {shippingInfo.lastName}
            </Text>
            <Text style={styles.infoText}>{shippingInfo.address}</Text>
            {shippingInfo.apartment && <Text style={styles.infoText}>{shippingInfo.apartment}</Text>}
            <Text style={styles.infoText}>
              {shippingInfo.city}, {shippingInfo.district}
            </Text>
            <Text style={styles.infoText}>{shippingInfo.phone}</Text>
            <TouchableOpacity onPress={() => router.push('/Cart/checkout')}>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noInfoText}>No shipping info provided.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Method</Text>
        {shippingMethod ? (
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>{shippingMethod.name}</Text>
            <Text style={styles.infoText}>${shippingMethod.price.toFixed(2)}</Text>
            <Text style={styles.infoText}>{shippingMethod.estimated}</Text>
            <TouchableOpacity onPress={() => router.push('/Cart/ShippingMethodScreen')}>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noInfoText}>No shipping method selected.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <FlatList
          data={paymentMethods}
          keyExtractor={(item) => item.id}
          renderItem={renderPaymentMethod}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping:</Text>
            <Text style={styles.summaryValue}>${shippingCost.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotal}>Total:</Text>
            <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Place Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
          <Text style={styles.returnButtonText}>Return to shipping method</Text>
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
  infoCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  infoText: {
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
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  paymentName: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  summaryCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  summaryTotalValue: {
    fontSize: 18,
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
    borderRadius: 12,
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
