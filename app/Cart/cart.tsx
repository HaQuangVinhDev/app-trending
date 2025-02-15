import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { Product } from '../data/cartproduct';

interface CartProps {
  items: Product[];
}

export default function Cart({ items = [] }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {items.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.name}</Text>
                <Text>${item.price.toFixed(2)}</Text>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalContainer: {
    borderTopWidth: 1,
    marginTop: 12,
    paddingTop: 8,
  },
  totalText: {
    fontWeight: 'bold',
  },
});
