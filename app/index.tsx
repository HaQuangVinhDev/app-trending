import { View } from 'react-native';
import Header from './components/header';
import Bestsell from './page/bestsell';
import Catalog from './components/catalog';
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>
        <Catalog />
      </View>
    </View>
  );
}
