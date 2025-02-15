// Shopcartform.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

export default function Shopcartform() {
  type CartItem = {
    id: number;
    name: string;
    price: number;
  };

  const [cart, setCart] = useState<CartItem[]>([]);
  const [minutes, setMinutes] = useState(9);
  const [seconds, setSeconds] = useState(51);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 59));
      if (seconds === 0 && minutes > 0) setMinutes((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text>
        Your cart will expire in {minutes}:{seconds.toString().padStart(2, '0')} minutes!
      </Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        ))
      )}
      <Button title="Proceed to Payment" onPress={() => alert('Proceeding to payment...')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  cartItem: { marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' },
});
