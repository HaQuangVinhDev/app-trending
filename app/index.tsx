import { View, StyleSheet, FlatList } from 'react-native';
import Header from './components/header';
import Catalog from './components/catalog';
import Bestseller from './components/bestseller';
import Banner from './components/banner';
import Picture from './components/Picture';
import Gifts from './components/gifts';
import Footer from './components/footer';
const sections = [
  { id: '1', component: <Catalog /> },
  { id: '2', component: <Bestseller /> },
  { id: '3', component: <Banner /> },
  { id: '4', component: <Picture /> },
  { id: '5', component: <Gifts /> },
  { id: '6', component: <Footer /> },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={sections}
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
