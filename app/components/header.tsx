import { useEffect, useState } from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useCartCount } from '../Cart/useCartCount';
import { Heart, ShoppingCart, User, Menu, Star, Gift, Truck, ChevronRight } from 'lucide-react-native';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/register';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Modal from 'react-native-modal';

export default function Header() {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [userName, setUserName] = useState<string | null>(null);
  const cartCount = useCartCount();

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email || 'User'); // ✅ Nếu user đăng nhập, cập nhật tên
      } else {
        setUserName(null); // ✅ Nếu user đăng xuất, reset tên
      }
    });
    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserName(null);
      Alert.alert('Success', 'Logout successful.');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'Logout failed. Please try again.');
    }
  };

  // Danh sách gợi ý cố định (có thể thay bằng API)
  const searchData = ['Valentine Gift', 'Couples Gift', 'Gift for Her', 'Birthday Gift', 'Anniversary Gift'];

  // Xử lý tìm kiếm
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 0) {
      const filteredSuggestions = searchData.filter((item) => item.toLowerCase().includes(text.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Xử lý chọn gợi ý
  const handleSelectSuggestion = (item: string) => {
    setSearchQuery(item);
    setSuggestions([]); // Ẩn gợi ý sau khi chọn
    router.push(`/`); // Điều hướng đến trang tìm kiếm
  };

  return (
    <PanGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          setIsOpenMenu(false);
        }
      }}
    >
      <View style={{ width: '100%' }}>
        {/* Announcement Bar */}
        <View style={{ backgroundColor: '#f13c20', paddingVertical: 8, paddingHorizontal: 16 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
            🎉 Order 2+ items to SAVE 10% using code: TRC10
          </Text>
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Logo */}
          <TouchableOpacity style={{ position: 'relative', marginBottom: 10 }} onPress={() => router.push('/')}>
            <Image source={require('~/assets/images/logo.jpg')} style={styles.logo} />
          </TouchableOpacity>

          {/* Icons */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Heart size={28} color="#4A4A4A" />
            </TouchableOpacity>
            {/* Nếu user đã đăng nhập, hiển thị tên + nút Logout */}
            {userName ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4A4A4A' }}>{userName}</Text>
                <TouchableOpacity onPress={handleLogout} style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 14, color: 'red' }}>Logout</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Nếu chưa đăng nhập, hiển thị icon đăng nhập
              <TouchableOpacity onPress={() => setLoginModalVisible(true)} style={{ marginLeft: 30, marginRight: 30 }}>
                <User size={28} color="#4A4A4A" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => router.push('/Cart/cart')} style={styles.cartContainer}>
              <ShoppingCart size={28} color="#4A4A4A" />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  {' '}
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            <LoginModal
              visible={isLoginModalVisible}
              onClose={() => setLoginModalVisible(false)}
              onSwitchToRegister={() => {
                setLoginModalVisible(false);
                setRegisterModalVisible(true);
              }}
              onLoginSuccess={(userName: string) => {
                console.log(`User ${userName} logged in successfully`);
              }}
            />
            {/* Gọi RegisterModal */}
            <RegisterModal
              visible={isRegisterModalVisible}
              onClose={() => setRegisterModalVisible(false)}
              onSwitchToLogin={() => {
                setRegisterModalVisible(false);
                setLoginModalVisible(true);
              }}
            />
          </View>
        </View>
        {/* Main Header */}
        <View style={styles.container}>
          <View style={styles.header}>
            {/* Menu Button */}
            <View>
              <TouchableOpacity onPress={() => setIsOpenMenu(true)}>
                <Menu size={28} color="#4A4A4A" />
              </TouchableOpacity>

              <Modal
                isVisible={isOpenMenu}
                onBackdropPress={() => setIsOpenMenu(false)}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
                backdropOpacity={0.3}
                style={styles.modal}
              >
                <View style={styles.inmenu}>
                  {/* Track Your Order */}
                  <TouchableOpacity style={styles.menuItem}>
                    <Text style={[styles.menuText, styles.boldText]}>📦 Track Your Order</Text>
                  </TouchableOpacity>

                  {/* Chuyển đổi tiền tệ */}
                  <Text style={styles.currency}>USD ▼</Text>

                  {/* Best Sellers & New Arrivals */}
                  <TouchableOpacity
                    onPress={() => router.push('/bestsellermain')}
                    style={[styles.menuItem, styles.highlightRed]}
                  >
                    <Text style={styles.menuintext}>🔥 Best Sellers</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => router.push('/admin/dashboard')}
                    style={[styles.menuItem, styles.highlightGreen]}
                  >
                    <Text style={styles.menuintext}>🆕 New Arrivals</Text>
                  </TouchableOpacity>

                  {/* Danh mục sản phẩm */}
                  {['Occasions', 'Recipients', 'Products', 'Gift Card'].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem}>
                      <Text style={styles.menuintext}>{item}</Text>
                      <ChevronRight size={16} color="#777" />
                    </TouchableOpacity>
                  ))}

                  {/* For Customers */}
                  <Text style={styles.sectionTitle}>For Customers</Text>
                  {['Rewards', 'Reviews', 'Gift Finder'].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem}>
                      <Text style={styles.menuintext}>{item}</Text>
                    </TouchableOpacity>
                  ))}

                  {/* By TrendingCustom */}
                  <Text style={styles.sectionTitle}>By TrendingCustom</Text>
                  {['Shipping info', 'Contact Us', 'Help Center', 'About Us', 'Our Blog'].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem}>
                      <Text style={styles.menuText}>{item}</Text>
                    </TouchableOpacity>
                  ))}

                  {/* Mạng xã hội */}
                  <View style={styles.socialIcons}>
                    <TouchableOpacity onPress={() => router.push('/admin/upload/upload')}>
                      <Image source={require('~/assets/images/facebook.jpg')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/runapp')}>
                      {' '}
                      <Image source={require('~/assets/images/youtube.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      {' '}
                      <Image source={require('~/assets/images/pinterest.jpg')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image source={require('~/assets/images/google.png')} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={{ flex: 1 }}>
              {/* Search Input */}
              <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              {/* Hiển thị danh sách gợi ý */}
              {suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  <FlatList
                    data={suggestions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectSuggestion(item)}>
                        <Text style={styles.suggestionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
          </View>

          {/* Dropdown Menu */}
          {isOpenMenu && (
            <View style={styles.menu}>
              <TouchableOpacity style={styles.menuItem}>
                <Star size={20} color="#f13c20" />
                <Text style={styles.menuText} onPress={() => router.push('/')}>
                  Reviews
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Gift size={20} color="#f13c20" />
                <Text style={styles.menuText} onPress={() => router.push('/')}>
                  Reward
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/components/Bestseller/items/thumnail') as any}
              >
                <Truck size={20} color="#f13c20" />
                <Text style={styles.menuText}>Track Order</Text>
              </TouchableOpacity>

              {/* Currency Picker */}
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Select Currency:</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={selectedCurrency}
                    onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
                    mode="dropdown"
                    style={styles.picker}
                  >
                    <Picker.Item label="USD" value="USD" />
                    <Picker.Item label="EUR" value="EUR" />
                    <Picker.Item label="VND" value="VND" />
                    <Picker.Item label="JPY" value="JPY" />
                  </Picker>
                </View>
              </View>

              {/*  Links */}
              <View>
                <TouchableOpacity onPress={() => router.push('/')}>
                  <Text style={styles.navItemText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/bestsellermain')}>
                  <Text style={styles.navItemText}>Best Sellers</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/components/formcontent')}>
                  <Text style={styles.navItemText}>New Arrivals</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.navItemText}>Occasions</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.navItemText}>Recipients</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.navItemText}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.navItemText}>Gift Cards</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.navItemText}>🎁 Gift Finder</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Trust Badge */}
          <View style={styles.trustBadge}>
            <Text style={styles.trustBadgeText}>
              Trusted by more than <Text style={styles.boldText}>2 Million Customers</Text> and{' '}
              <Text style={styles.boldText}>750K 5-Star Reviews</Text> ⭐⭐⭐⭐⭐
            </Text>
          </View>
        </View>
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    position: 'relative',
    marginRight: 60,
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  menu: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  pickerLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  pickerWrapper: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 60,
    width: 150,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 10,

    marginTop: 10,
  },
  trustBadge: {
    marginTop: 16,
    marginBottom: 16,
  },
  trustBadgeText: {
    textAlign: 'center',
    color: '#4A4A4A',
  },
  boldText: {
    fontWeight: 'bold',
  },
  navItemText: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 8,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },

  // menu

  highlightRed: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  highlightGreen: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#777',
  },
  currency: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  inmenu: {
    width: '80%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
  menuintext: {
    fontSize: 16,
    color: '#333',
  },
});
