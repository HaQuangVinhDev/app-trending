import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Link, router } from 'expo-router';
import { Heart, ShoppingCart, User, Menu, Star, Gift, Truck } from 'lucide-react-native';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  return (
    <View style={{ width: '100%' }}>
      {/* Announcement Bar */}
      <View style={{ backgroundColor: '#f13c20', paddingVertical: 8, paddingHorizontal: 16 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          🎉 Order 2+ items to SAVE 10% using code: TRC10
        </Text>
      </View>

      {/* Main Header */}
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Logo */}

          <TouchableOpacity onPress={() => router.push('/')}>
            <Image source={require('~/assets/images/logo.jpg')} style={styles.logo} />
          </TouchableOpacity>
          {/* Search Input */}
          <TextInput style={styles.input} placeholder="Search..." placeholderTextColor="#888" />

          {/* Menu Button */}
          <TouchableOpacity onPress={() => setIsOpenMenu(!isOpenMenu)}>
            <Menu size={28} color="#4A4A4A" />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {isOpenMenu && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Star size={20} color="#f13c20" />
              <Link href="/" style={styles.menuText}>
                Reviews
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Gift size={20} color="#f13c20" />
              <Link href="/" style={styles.menuText}>
                Reward
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Truck size={20} color="#f13c20" />
              <Link href="/" style={styles.menuText}>
                Track Order
              </Link>
            </TouchableOpacity>

            {/* Currency Picker */}
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Select Currency:</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedCurrency}
                  onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="USD" value="USD" />
                  <Picker.Item label="EUR" value="EUR" />
                  <Picker.Item label="VND" value="VND" />
                  <Picker.Item label="JPY" value="JPY" />
                </Picker>
              </View>
            </View>

            {/* Icons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <Heart size={24} color="#4A4A4A" style={styles.menuItem} />
              </TouchableOpacity>
              <TouchableOpacity>
                <User size={24} color="#4A4A4A" style={styles.menuItem} />
              </TouchableOpacity>
              <TouchableOpacity>
                <ShoppingCart size={24} color="#4A4A4A" style={styles.menuItem} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Text style={[styles.navItemText]}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.navItemText}>Best Sellers</Text>
              </TouchableOpacity>
              <TouchableOpacity>
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
        <View style={styles.trustBadge}>
          <Text style={styles.trustBadgeText}>
            Trusted by more than <Text style={styles.boldText}>2 Million Customers</Text> and{' '}
            <Text style={styles.boldText}>750K 5-Star Reviews</Text> ⭐⭐⭐⭐⭐
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 150, // Giảm độ rộng picker
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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
  activeNavItem: {
    color: '#F04B23',
  },
});
