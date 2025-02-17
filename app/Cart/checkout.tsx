import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { Search, Info } from 'lucide-react-native';
import Checkbox from 'expo-checkbox';

export default function ShippingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    newsletter: false,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    phone: '',
    saveInfo: false,
  });

  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const cities = ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong', 'Can Tho'];
  const districts = ['Nam Tu Liem', 'Ha Dong', 'Cau Giay', 'Thanh Xuan', 'Hoan Kiem'];

  const handleSelection = (item: string) => {
    if (modalType === 'city') {
      setCity(item);
    } else {
      setDistrict(item);
    }
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.address || !city || !district || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields!');
      return;
    }

    try {
      if (formData.saveInfo) {
        await AsyncStorage.setItem(
          'shippingInfo',
          JSON.stringify({
            ...formData,
            city,
            district,
          }),
        );
      }

      Alert.alert('Success', 'Continuing to shipping...');
      router.push('/'); // Adjust route as needed
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.emailInput]}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.loginLink}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formData.newsletter}
            onValueChange={(value) => setFormData({ ...formData, newsletter: value })}
            color={formData.newsletter ? '#4630EB' : undefined}
          />
          <Text style={styles.checkboxLabel}>Sign up for exclusive offers and news via email.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping address</Text>

        <TextInput
          style={styles.input}
          placeholder="First name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />

        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.input, styles.searchInput]}
            placeholder="Address"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
          />
          <Search style={styles.searchIcon} size={20} color="#666" />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Apartment, suite, etc. (optional)"
          value={formData.apartment}
          onChangeText={(text) => setFormData({ ...formData, apartment: text })}
        />

        <TouchableOpacity
          style={styles.selectBox}
          onPress={() => {
            setModalType('city');
            setModalVisible(true);
          }}
        >
          <Text style={[styles.selectText, !city && styles.placeholderText]}>{city || 'Select City/Province'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectBox}
          onPress={() => {
            setModalType('district');
            setModalVisible(true);
          }}
        >
          <Text style={[styles.selectText, !district && styles.placeholderText]}>{district || 'Select District'}</Text>
        </TouchableOpacity>

        <View style={styles.phoneContainer}>
          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder="Phone number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />
          <Info style={styles.infoIcon} size={20} color="#666" />
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formData.saveInfo}
            onValueChange={(value) => setFormData({ ...formData, saveInfo: value })}
            color={formData.saveInfo ? '#4630EB' : undefined}
          />
          <Text style={styles.checkboxLabel}>Save this information for next time</Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Continue to shipping</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
          <Text style={styles.returnButtonText}>Return to cart</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} style={styles.modal}>
        <View style={styles.modalContent}>
          <FlatList
            data={modalType === 'city' ? cities : districts}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.option} onPress={() => handleSelection(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 12,
    fontSize: 16,
  },
  emailInput: {
    flex: 1,
    marginRight: 12,
  },
  loginLink: {
    padding: 8,
  },
  loginText: {
    color: '#0066cc',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  searchContainer: {
    position: 'relative',
  },
  searchInput: {
    paddingRight: 40,
  },
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  phoneContainer: {
    position: 'relative',
  },
  phoneInput: {
    paddingRight: 40,
  },
  infoIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  selectBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  selectText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    color: '#aaa',
  },
  submitButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  returnButton: {
    padding: 16,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#0066cc',
    fontSize: 14,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%',
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
});
