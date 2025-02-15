// ShoppingCart.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function ShoppingCart() {
  interface CartItem {
    id: number;
    name: string;
    price: number;
  }

  const [cart, setCart] = useState<CartItem[]>([]);

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  cartItem: { marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' },
});
