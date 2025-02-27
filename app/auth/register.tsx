import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { registerUser } from '../utils/authService';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ visible, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegister = async () => {
    try {
      console.log('📩 Registering user with:', email, password, firstName, lastName);
      await registerUser(email, password, firstName);
      Alert.alert('Success', 'Account created! Please log in to continue.');
      onClose(); // Đóng modal đăng ký
    } catch (error: any) {
      console.error('❌ Register Error:', error);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This email is already registered. Please login instead.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email format. Please check again.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password must be at least 6 characters.');
      } else if (error.code === 'auth/operation-not-allowed') {
        Alert.alert('Error', 'Email/password accounts are disabled.');
      } else if (error.code === 'auth/missing-password') {
        Alert.alert('Error', 'Password is required.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };
  const handleClose = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    onClose();
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={handleClose}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, margin: 20, position: 'relative' }}>
          {/* Nút X để đóng modal */}
          <TouchableOpacity onPress={handleClose} style={{ position: 'absolute', top: 10, right: 10 }}>
            <X size={28} color="black" />
          </TouchableOpacity>
          {/* Tiêu đề Register */}
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Register</Text>
          {/* Form đăng ký */}
          {/* Email */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput placeholder="Enter Email" value={email} onChangeText={setEmail} style={styles.input} />
          {/* First Name */}
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="Enter First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          {/* Last Name */}
          <Text style={styles.label}>Last Name</Text>
          <TextInput placeholder="Enter Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            style={styles.input}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            {' '}
            <Checkbox
              value={isPasswordVisible}
              onValueChange={setIsPasswordVisible} // Toggle mật khẩu
              style={{ marginRight: 10 }}
            />
            <Text>Show password</Text>
          </View>

          {/* Sign In */}
          <TouchableOpacity
            onPress={handleRegister}
            style={{ borderRadius: 6, backgroundColor: 'red', padding: 13, marginBottom: 10 }}
          >
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>Sign In</Text>
          </TouchableOpacity>
          {/* text */}
          <Text style={{ fontSize: 16, margin: 20, textAlign: 'center', opacity: 0.5 }}>Or Register with</Text>
          {/* Google */}
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              borderRadius: 6,
              borderWidth: 1,
              padding: 10,
              marginBottom: 20,
            }}
          >
            <FontAwesome name="google" size={24} color="#ff402a" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 18, textAlign: 'center' }}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 6,
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <FontAwesome name="facebook" size={24} color="#1877F2" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 18, textAlign: 'center' }}>Continue with Facebook</Text>
          </TouchableOpacity>
          {/* Nút chuyển sang Login */}
          <TouchableOpacity
            onPress={() => {
              handleClose();
              onSwitchToLogin();
            }}
            style={styles.LoginResgister}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sing In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Button: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
  },
  LoginResgister: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    position: 'absolute',
    top: 10,
    right: 60,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 0px',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  google: {},
});
