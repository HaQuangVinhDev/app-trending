import { View, Text, Image, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';

const Banner = () => {
  const [imageSource, setImageSource] = useState(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (screenWidth >= 1024) {
      setImageSource(require('~/assets/images/best-sellers-pc.png'));
    } else if (screenWidth >= 768) {
      setImageSource(require('~/assets/images/best-sellers-pc.png'));
    } else {
      setImageSource(require('~/assets/images/best-sellers-pc.png'));
    }
  }, [screenWidth]);

  return (
    <View style={{ position: 'relative', alignItems: 'center', paddingVertical: 16 }}>
      {imageSource && (
        <Image
          source={imageSource}
          style={{ width: '100%', height: undefined, aspectRatio: 16 / 9 }}
          resizeMode="contain"
        />
      )}
      <View
        style={{
          position: 'absolute',
          inset: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          paddingHorizontal: 16,
        }}
      >
        <View style={{ alignItems: 'center', maxWidth: 600 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Best Sellers</Text>
          <Text style={{ fontSize: 16, color: 'white', textAlign: 'center', marginTop: 8 }}>
            Find the perfect personalized gift for your loved ones on our Best Sellers page!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Banner;
