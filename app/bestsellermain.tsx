import { Stack } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import BodyHeader from './components/Bestseller/bodyheder';
import Header from './components/header';
import Footer from './components/footer';

const seller = [{ id: '1', component: <BodyHeader /> }];
export default function BestSellerMain() {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={seller}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View>{item.component}</View>}
        contentContainerStyle={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    padding: 16,
  },
});
