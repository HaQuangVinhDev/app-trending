import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function Checkout() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  const handlePayment = async () => {
    if (!name || !phone || !address || !city || !district) {
      Alert.alert('Error', 'Please fill in all required fields!');
      return;
    }

    Alert.alert('Payment Successful', `Thank you, ${name}, for your purchase!`);
    await AsyncStorage.removeItem('cart');
    router.push('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Shipping Address</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Detailed Address" value={address} onChangeText={setAddress} />
        </View>
        <View style={styles.inputContainer}>
          <Picker selectedValue={city} onValueChange={(itemValue) => setCity(itemValue)} style={styles.picker}>
            <Picker.Item label="Select City/Province" value="" />
            <Picker.Item label="Hanoi" value="Hanoi" />
            <Picker.Item label="Ho Chi Minh City" value="Ho Chi Minh City" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Picker selectedValue={district} onValueChange={(itemValue) => setDistrict(itemValue)} style={styles.picker}>
            <Picker.Item label="Select District" value="" />
            <Picker.Item label="District 1" value="District 1" />
            <Picker.Item label="District 2" value="District 2" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 16, backgroundColor: 'white', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  inputContainer: { marginBottom: 12, width: '100%' },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
