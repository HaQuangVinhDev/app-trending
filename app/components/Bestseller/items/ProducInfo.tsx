import { View, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const Star = ({ filled }: { filled: boolean }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill={filled ? '#FFD700' : 'none'}
    stroke="#FFD700"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </Svg>
);

const ProductInfo = () => {
  return (
    <View style={{ marginLeft: 0, paddingHorizontal: 16, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2D3748', textAlign: 'center' }}>
        Y2K Couple Personalized LED Night Light
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#38A169' }}>$39.99 USD</Text>
        <Text style={{ textDecorationLine: 'line-through', color: '#A0AEC0', marginLeft: 8 }}>$49.99 USD</Text>
        <Text style={{ color: '#E53E3E', marginLeft: 8 }}>20% OFF</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} filled={i < 4} />
        ))}
        <Text style={{ fontSize: 12, color: '#4A5568', marginLeft: 4 }}>746 reviews</Text>
      </View>
      <Text style={{ color: '#4A5568', fontSize: 14, textAlign: 'center', marginTop: 8 }}>
        Customize this unique couple night light with your names and a special message. Perfect for gifts or to
        celebrate your relationship.
      </Text>
    </View>
  );
};

export default ProductInfo;
