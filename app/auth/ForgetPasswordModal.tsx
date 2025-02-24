import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { X } from 'lucide-react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '~/firebaseConfig'; // Import Firebase Auth

interface ForgetPasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ForgetPasswordModal({ visible, onClose }: ForgetPasswordModalProps) {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset link has been sent to your email.');
      setEmail(''); // Xóa email sau khi gửi
      onClose(); // Đóng modal
    } catch (error: any) {
      console.error('❌ Reset Password Error:', error);
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email format.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, margin: 20, position: 'relative' }}>
          {/* Nút X để đóng modal */}
          <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
            <X size={24} color="black" />
          </TouchableOpacity>

          {/* Tiêu đề Forget Password */}
          <Text style={{ fontSize: 16, marginBottom: 5, marginTop: 20 }}>Reset your password</Text>
          <Text style={{ fontSize: 14, marginBottom: 20 }}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>
          {/* Nhập email */}
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Email Address</Text>
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          />

          <TouchableOpacity
            onPress={handleResetPassword}
            style={{ backgroundColor: 'red', padding: 15, marginBottom: 10, borderRadius: 8 }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
