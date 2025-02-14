import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './components/header';
import Catalog from './components/catalog';
import Bestseller from './components/bestseller';
import Banner from './components/banner';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Catalog />
        <Banner />
        <Bestseller />
      </ScrollView>
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
    flexGrow: 1,
  },
});
