import { View, StyleSheet, FlatList } from 'react-native';
import Header from './components/header';
import Catalog from './components/catalog';
import Bestseller from './components/bestseller';
import Banner from './components/banner';
import Picture from './components/Picture';
import Gifts from './components/gifts';
import Footer from './components/footer';
import Best from './components/best';
import OurBlog from './components/ourblog';
import Card from './components/card';
import Ban from './components/ban';
import Question from './components/quesion';
import FormContent from './components/formcontent';

const sections = [
  { id: '1', component: <Catalog /> },
  { id: '2', component: <Bestseller /> },
  { id: '3', component: <Banner /> },
  { id: '4', component: <Ban /> },
  { id: '5', component: <Picture /> },
  { id: '6', component: <Gifts /> },
  { id: '7', component: <Best /> },
  { id: '8', component: <Card /> },
  { id: '9', component: <OurBlog /> },
  { id: '10', component: <Question /> },

  { id: '11', component: <Footer /> },
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
