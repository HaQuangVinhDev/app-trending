import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface CartItem {
  productId: string;
  title: string;
  image: any;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedItem, setEditedItem] = useState<CartItem | null>(null);
  const router = useRouter();
  const fadeAnim = useState(new Animated.Value(0))[0]; // Animation cho Modal

  const colors = ['Black', 'White', 'Red', 'Blue', 'Green'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, []);

  const closeModal = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      Keyboard.dismiss();
    });
  }, [fadeAnim]);

  const openModal = useCallback(() => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const total = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);

  const clearCart = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCartItems([]);
    } catch (error) {
      console.error('Lỗi khi xóa giỏ hàng:', error);
    }
  }, []);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Thông báo', 'Giỏ hàng của bạn đang trống!');
      return;
    }
    router.push('/Cart/checkout');
  }, [cartItems.length, router]);

  const openPreview = useCallback(
    (item: CartItem) => {
      setSelectedItem(item);
      setEditedItem({ ...item });
      openModal();
    },
    [openModal],
  );

  const updateQuantity = useCallback(
    (change: number) => {
      if (!editedItem) return;
      const newQuantity = Math.max(1, editedItem.quantity + change);
      setEditedItem({ ...editedItem, quantity: newQuantity });
    },
    [editedItem],
  );

  const selectColor = useCallback(
    (color: string) => {
      if (!editedItem) return;
      setEditedItem({ ...editedItem, color });
    },
    [editedItem],
  );

  const selectSize = useCallback(
    (size: string) => {
      if (!editedItem) return;
      setEditedItem({ ...editedItem, size });
    },
    [editedItem],
  );

  const saveEditedItem = useCallback(async () => {
    if (!editedItem) return;
    const updatedCart = cartItems.map((item) => (item.productId === editedItem.productId ? editedItem : item));
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    closeModal();
  }, [editedItem, cartItems, closeModal]);

  const deleteItem = useCallback(async () => {
    if (!selectedItem) return;
    Alert.alert('Xác nhận', `Bạn có chắc muốn xóa "${selectedItem.title}" khỏi giỏ hàng?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          const updatedCart = cartItems.filter((item) => item.productId !== selectedItem.productId);
          setCartItems(updatedCart);
          await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
          closeModal();
        },
      },
    ]);
  }, [selectedItem, cartItems, closeModal]);

  const renderItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <TouchableOpacity style={styles.item} onPress={() => openPreview(item)}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>
            {item.title} <Text style={styles.quantity}>(x{item.quantity})</Text>
          </Text>
          <Text style={styles.itemInfo}>
            Color: {item.color} • Size: {item.size}
          </Text>
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    ),
    [openPreview],
  );

  return (
    <LinearGradient colors={['#f0f4f8', '#e2e8f0']} style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={handleCheckout}>
              <LinearGradient colors={['#34d399', '#2ecc71']} style={styles.checkoutButton}>
                <Text style={styles.buttonText}>Proceed to Checkout</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearCart}>
              <LinearGradient colors={['#f87171', '#ef4444']} style={styles.clearButton}>
                <Text style={styles.buttonText}>Clear Cart</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal animationType="none" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                {editedItem && (
                  <>
                    <Image source={editedItem.image} style={styles.modalImage} />
                    <Text style={styles.modalTitle}>{editedItem.title}</Text>

                    <Text style={styles.modalText}>Quantity:</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(-1)}>
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{editedItem.quantity}</Text>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(1)}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.modalText}>Color:</Text>
                    <View style={styles.optionContainer}>
                      {colors.map((color) => (
                        <TouchableOpacity
                          key={color}
                          style={[styles.optionButton, editedItem.color === color && styles.optionButtonSelected]}
                          onPress={() => selectColor(color)}
                        >
                          <Text style={[styles.optionText, editedItem.color === color && styles.optionTextSelected]}>
                            {color}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <Text style={styles.modalText}>Size:</Text>
                    <View style={styles.optionContainer}>
                      {sizes.map((size) => (
                        <TouchableOpacity
                          key={size}
                          style={[styles.optionButton, editedItem.size === size && styles.optionButtonSelected]}
                          onPress={() => selectSize(size)}
                        >
                          <Text style={[styles.optionText, editedItem.size === size && styles.optionTextSelected]}>
                            {size}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <Text style={styles.modalPrice}>Price: ${(editedItem.price * editedItem.quantity).toFixed(2)}</Text>

                    <View style={styles.modalButtons}>
                      <TouchableOpacity onPress={saveEditedItem}>
                        <LinearGradient colors={['#34d399', '#2ecc71']} style={styles.saveButton}>
                          <Text style={styles.buttonText}>Save</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={deleteItem}>
                        <LinearGradient colors={['#f87171', '#ef4444']} style={styles.deleteButton}>
                          <Text style={styles.buttonText}>Delete</Text>
                        </LinearGradient>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={closeModal}>
                        <LinearGradient colors={['#60a5fa', '#3b82f6']} style={styles.closeButton}>
                          <Text style={styles.buttonText}>Close</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 60,
    fontStyle: 'italic',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  quantity: {
    fontWeight: '400',
    color: '#64748b',
  },
  itemInfo: {
    fontSize: 14,
    color: '#64748b',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  footer: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  checkoutButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 4,
  },
  clearButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  modalImage: {
    width: 160,
    height: 160,
    borderRadius: 16,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
    alignSelf: 'flex-start',
    fontWeight: '500',
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
    marginVertical: 16,
  },
  modalButtons: {
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  saveButton: { paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  deleteButton: { paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  closeButton: { paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 8,
  },
  quantityButton: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  quantityButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 24,
    color: '#1e293b',
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  optionButtonSelected: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  optionText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
