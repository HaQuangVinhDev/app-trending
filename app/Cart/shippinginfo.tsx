import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ShippingInfoForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    // Xử lý gửi thông tin
    if (!name || !address || !city || !postalCode || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Gửi thông tin (có thể gọi API hoặc lưu vào state)
    Alert.alert('Success', 'Shipping information submitted successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shipping Information</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default ShippingInfoForm;
