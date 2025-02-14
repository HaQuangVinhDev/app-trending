import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Search, ShoppingCart, User, Heart, Menu } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '~/components/ui/input';
import type { ImageSourcePropType } from 'react-native';
import { Link } from 'expo-router';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Announcement Bar */}
      <View style={styles.announcementBar}>
        <Text style={styles.announcementText}>🎉 Order 2+ items to SAVE 10% using code: TRC10</Text>
      </View>

      {/* Main Header */}
      <View style={styles.mainHeader}>
        {/* Logo */}

        <Link href="/">
          <Image source={require('~/assets/images/icon.png')} style={styles.logo} resizeMode="contain" />
          {/* Mobile Menu Button */}
          <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)} style={styles.menuButton}>
            <Menu size={24} color="#4A4A4A" />
          </TouchableOpacity>
        </Link>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Input />
          <Search style={styles.searchIcon} size={20} color="#9CA3AF" />
        </View>

        {/* Navigation Items */}
        {isMenuOpen && (
          <View style={styles.navItems}>
            <TouchableOpacity>
              <Text style={styles.navItemText}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.navItemText}>Reward</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.navItemText}>Track Order</Text>
            </TouchableOpacity>
            {/* Currency selector would need a custom component in React Native */}
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <Heart size={24} color="#4A4A4A" />
              </TouchableOpacity>
              <TouchableOpacity>
                <User size={24} color="#4A4A4A" />
              </TouchableOpacity>
              <TouchableOpacity>
                <ShoppingCart size={24} color="#4A4A4A" />
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

        {/* Main Navigation */}
        {isMenuOpen && (
          <View style={styles.mainNav}>
            <TouchableOpacity>
              <Text style={[styles.navItemText, styles.activeNavItem]}>Home</Text>
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
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  announcementBar: {
    backgroundColor: '#f13c20',
    padding: 8,
  },
  announcementText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainHeader: {
    padding: 16,
  },
  logo: {
    width: 200,
    height: 50,
  },
  menuButton: {
    alignSelf: 'flex-end',
  },
  searchBarContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  navItems: {
    marginTop: 16,
  },
  navItemText: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
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
  mainNav: {
    marginTop: 16,
  },
  activeNavItem: {
    color: '#F04B23',
  },
});
