import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Question() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
      <View style={{ maxWidth: 400, width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#373f47', textAlign: 'center', marginBottom: 16 }}>
          Unlock 10% {'\n'} OFF Your First Order
        </Text>
        <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', marginBottom: 24 }}>
          Find special gifts made just for you and get a cool 10% OFF your first buy! Make gift-giving super awesome
          with a sprinkle of extra love!
        </Text>
        <View style={{ width: '100%', gap: 12 }}>
          <TextInput
            style={{
              width: '100%',
              fontSize: 16,
              fontWeight: '600',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 8,
              padding: 12,
              color: '#373f47',
            }}
            placeholder="First Name"
            placeholderTextColor="#888"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={{
              width: '100%',
              fontSize: 16,
              fontWeight: '600',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 8,
              padding: 12,
              color: '#373f47',
            }}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity
            style={{
              width: '100%',
              padding: 14,
              backgroundColor: 'red',
              borderRadius: 8,
              alignItems: 'center',
            }}
            onPress={() => router.push('/')}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Claim Your 10% OFF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
