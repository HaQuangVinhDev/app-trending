import { Stack } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import BodyHeader from './components/Bestseller/bodyheder';
import Header from './components/header';
import Footer from './components/footer';
import Question from './components/quesion';
import Banner from './components/Bestseller/banner';
import Cart from './Cart/index';

const seller = [
  { id: '2', component: <Banner /> },
  { id: '1', component: <BodyHeader /> },
  { id: '3', component: <Question /> },
  { id: '4', component: <Footer /> },
  { id: '5', component: <Cart /> },
];
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
