import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, Button, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/firebaseConfig';
import ForgetPasswordModal from './ForgetPasswordModal';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLoginSuccess: (userName: string) => void;
}

export default function LoginModal({ visible, onClose, onSwitchToRegister, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgetPasswordVisible, setForgetPasswordVisible] = useState(false);

  const handleClose = () => {
    setEmail('');
    setPassword('');
    onClose();
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully!');
      onLoginSuccess(userCredential.user.displayName || userCredential.user.email || 'User');
      handleClose();
    } catch (error: any) {
      console.error('❌ Login Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={handleClose}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, margin: 20, position: 'relative' }}>
          <TouchableOpacity onPress={handleClose} style={{ position: 'absolute', padding: 10, top: 1, right: 1 }}>
            <X size={24} color="black" />
          </TouchableOpacity>
          {/* Tiêu đề Login */}
          <Text style={{ fontSize: 20, marginBottom: 40, paddingTop: 30 }}>Sign In</Text>
          {/* Form đăng nhập */}
          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput placeholder=" Enter Email" value={email} onChangeText={setEmail} style={styles.input} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity onPress={() => setForgetPasswordVisible(true)}>
              <Text style={{ color: 'blue' }}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity
            onPress={handleLogin}
            style={{ borderRadius: 8, backgroundColor: 'red', padding: 15, marginBottom: 10 }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
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
          <Text style={{ fontSize: 12, opacity: 0.5, margin: 20 }}>
            By clicking Sign in or Continue with Google, Facebook, you agree to Trendingcustom Terms of Use and Privacy
            Policy . Trendingcustom may send you communications; you may change your preferences in your account
            settings. We'll never post without your permission.
          </Text>

          {/* Nút chuyển sang Register */}
          <TouchableOpacity
            onPress={() => {
              handleClose();
              onSwitchToRegister();
            }}
            style={styles.LoginResgister}
          >
            <Text style={{ fontSize: 16 }}>SignUpNow</Text>
          </TouchableOpacity>
        </View>

        {/* Forget Password Modal */}
        <ForgetPasswordModal visible={isForgetPasswordVisible} onClose={() => setForgetPasswordVisible(false)} />
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
    top: 40,
    right: 20,
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
  sign: {
    position: 'absolute',
    top: 30,
    right: -40,
  },
});
