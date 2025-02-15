import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  images: [
    'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
    'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
    'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
    'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
  ],
  colors: [
    { name: 'White', color: '#FFFFFF' },
    { name: 'Gray', color: '#E5E7EB' },
    { name: 'Black', color: '#111827' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
  ],
};

export default function ProductScreen() {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{product.name}</Text>
      <Text style={{ fontSize: 20, color: '#555', marginBottom: 16 }}>{product.price}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {product.images.map((src, index) => (
          <Image
            key={index}
            source={{ uri: src }}
            style={{ width: 200, height: 200, marginRight: 8, borderRadius: 8 }}
          />
        ))}
      </ScrollView>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16 }}>Choose Color</Text>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {product.colors.map((color) => (
          <TouchableOpacity
            key={color.name}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: color.color,
              marginRight: 8,
              borderWidth: selectedColor.name === color.name ? 2 : 0,
              borderColor: 'black',
            }}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16 }}>Choose Size</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
        {product.sizes.map((size) => (
          <TouchableOpacity
            key={size.name}
            style={{
              padding: 10,
              borderRadius: 8,
              marginRight: 8,
              marginBottom: 8,
              backgroundColor: size.inStock ? (selectedSize.name === size.name ? '#4F46E5' : '#E5E7EB') : '#D1D5DB',
            }}
            disabled={!size.inStock}
            onPress={() => setSelectedSize(size)}
          >
            <Text style={{ color: size.inStock ? (selectedSize.name === size.name ? 'white' : 'black') : '#6B7280' }}>
              {size.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#4F46E5',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 16,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Add to Bag</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
