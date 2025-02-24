import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Menu, X, ChevronRight, ShoppingCart, User } from 'lucide-react-native';

export default function SidebarMenu() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <ShoppingCart size={28} color="#333" />
      {/* Nút mở Menu */}
      <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
        <Menu size={28} color="#333" />
      </TouchableOpacity>

      {/* Modal Menu */}
      <Modal
        isVisible={isMenuVisible}
        onBackdropPress={() => setIsMenuVisible(false)}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        backdropOpacity={0.3}
        style={styles.modal}
      >
        <View style={styles.menu}>
          {/* Track Your Order */}
          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuText, styles.boldText]}>📦 Track Your Order</Text>
          </TouchableOpacity>

          {/* Chuyển đổi tiền tệ */}
          <Text style={styles.currency}>USD ▼</Text>

          {/* Best Sellers & New Arrivals */}
          <TouchableOpacity style={[styles.menuItem, styles.highlightRed]}>
            <Text style={styles.menuText}>🔥 Best Sellers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.highlightGreen]}>
            <Text style={styles.menuText}>🆕 New Arrivals</Text>
          </TouchableOpacity>

          {/* Danh mục sản phẩm */}
          {['Occasions', 'Recipients', 'Products', 'Gift Card'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuText}>{item}</Text>
              <ChevronRight size={16} color="#777" />
            </TouchableOpacity>
          ))}

          {/* For Customers */}
          <Text style={styles.sectionTitle}>For Customers</Text>
          {['Rewards', 'Reviews', 'Gift Finder'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuText}>{item}</Text>
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
            <Image source={require('~/assets/images/facebook.jpg')} style={styles.icon} />
            <Image source={require('~/assets/images/youtube.png')} style={styles.icon} />
            <Image source={require('~/assets/images/pinterest.jpg')} style={styles.icon} />
            <Image source={require('~/assets/images/google.png')} style={styles.icon} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  menu: {
    width: '80%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
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
});
