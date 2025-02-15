import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';

interface ProductImageProps {
  mainImage: ImageSourcePropType;
  thumbnails: ImageSourcePropType[];
}

const ProductImage: React.FC<ProductImageProps> = ({ mainImage, thumbnails }) => {
  const [currentImage, setCurrentImage] = useState<ImageSourcePropType>(mainImage);

  return (
    <View style={styles.container}>
      {/* Không dùng { uri: currentImage }, thay vào đó truyền trực tiếp */}
      <Image source={currentImage} style={styles.mainImage} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>
        {thumbnails.map((thumb, index) => (
          <TouchableOpacity key={index} onPress={() => setCurrentImage(thumb)}>
            <Image source={thumb} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  mainImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  thumbnailContainer: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});

export default ProductImage;
