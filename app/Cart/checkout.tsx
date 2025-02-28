import { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { Search, Info } from 'lucide-react-native';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';

interface FormData {
  email: string;
  newsletter: boolean;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  phone: string;
  saveInfo: boolean;
}

export default function ShippingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
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
  const [modalType, setModalType] = useState<'city' | 'district' | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const cities = useMemo(() => ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong', 'Can Tho'], []);
  const districts = useMemo(() => ['Nam Tu Liem', 'Ha Dong', 'Cau Giay', 'Thanh Xuan', 'Hoan Kiem'], []);

  // Tự động điền thông tin từ AsyncStorage khi khởi động
  useEffect(() => {
    const loadSavedInfo = async () => {
      try {
        const savedInfo = await AsyncStorage.getItem('shippingInfo');
        if (savedInfo) {
          const parsedInfo = JSON.parse(savedInfo);
          setFormData(parsedInfo);
          setCity(parsedInfo.city || '');
          setDistrict(parsedInfo.district || '');
        }
      } catch (error) {
        console.error('Error loading saved info:', error);
      }
    };
    loadSavedInfo();
  }, []);

  const filteredItems = useMemo(() => {
    const list = modalType === 'city' ? cities : districts;
    return searchQuery ? list.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())) : list;
  }, [searchQuery, modalType, cities, districts]);

  const handleSelection = useCallback(
    (item: string) => {
      if (modalType === 'city') setCity(item);
      else setDistrict(item);
      setModalVisible(false);
      setSearchQuery('');
    },
    [modalType],
  );

  const validateForm = useCallback(() => {
    const errors: string[] = [];
    if (!formData.email) errors.push('Email is required');
    if (!formData.firstName) errors.push('First name is required');
    if (!formData.lastName) errors.push('Last name is required');
    if (!formData.address) errors.push('Address is required');
    if (!city) errors.push('City is required');
    if (!district) errors.push('District is required');
    if (!formData.phone) errors.push('Phone number is required');
    else if (!/^\d{10,}$/.test(formData.phone)) errors.push('Invalid phone number');
    return errors;
  }, [formData, city, district]);

  const handleSubmit = useCallback(async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      Alert.alert('Error', errors.join('\n'));
      return;
    }

    setIsLoading(true);
    try {
      const shippingInfo = { ...formData, city, district };
      if (formData.saveInfo) {
        await AsyncStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
      }
      Alert.alert('Success', 'Continuing to shipping...');
      router.push('/Cart/ShippingMethodScreen');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, city, district, router, validateForm]);

  const openModal = useCallback((type: 'city' | 'district') => {
    setModalType(type);
    setModalVisible(true);
  }, []);

  const renderOption = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity style={styles.option} onPress={() => handleSelection(item)}>
        <Text style={styles.optionText}>{item}</Text>
      </TouchableOpacity>
    ),
    [handleSelection],
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#f0f4f8', '#e2e8f0']} style={styles.gradientBackground}>
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
              color={formData.newsletter ? '#059669' : undefined}
            />
            <Text style={styles.checkboxLabel}>Sign up for exclusive offers and news</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>

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
            <Search style={styles.searchIcon} size={20} color="#64748b" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Apartment, suite, etc. (optional)"
            value={formData.apartment}
            onChangeText={(text) => setFormData({ ...formData, apartment: text })}
          />
          <TouchableOpacity style={styles.selectBox} onPress={() => openModal('city')}>
            <Text style={[styles.selectText, !city && styles.placeholderText]}>{city || 'Select City/Province'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectBox} onPress={() => openModal('district')}>
            <Text style={[styles.selectText, !district && styles.placeholderText]}>
              {district || 'Select District'}
            </Text>
          </TouchableOpacity>
          <View style={styles.phoneContainer}>
            <TextInput
              style={[styles.input, styles.phoneInput]}
              placeholder="Phone number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
            <Info style={styles.infoIcon} size={20} color="#64748b" />
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={formData.saveInfo}
              onValueChange={(value) => setFormData({ ...formData, saveInfo: value })}
              color={formData.saveInfo ? '#059669' : undefined}
            />
            <Text style={styles.checkboxLabel}>Save this information for next time</Text>
          </View>

          <TouchableOpacity onPress={handleSubmit} disabled={isLoading}>
            <LinearGradient colors={['#34d399', '#059669']} style={styles.submitButton}>
              <View style={styles.buttonContent}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Continue to shipping</Text>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
            <Text style={styles.returnButtonText}>Return to cart</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContent}>
          <TextInput
            style={styles.modalSearchInput}
            placeholder={`Search ${modalType === 'city' ? 'city' : 'district'}`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item}
            renderItem={renderOption}
            style={styles.modalList}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  emailInput: {
    flex: 1,
    marginRight: 12,
  },
  loginLink: {
    padding: 8,
  },
  loginText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 12,
    fontSize: 14,
    color: '#64748b',
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
    top: 18,
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
    top: 18,
  },
  selectBox: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  selectText: {
    fontSize: 16,
    color: '#1e293b',
  },
  placeholderText: {
    color: '#94a3b8',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 16,
    alignItems: 'center',
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
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  modalSearchInput: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  modalList: {
    flexGrow: 0,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  optionText: {
    fontSize: 16,
    color: '#1e293b',
  },
});
