import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const productImages = [
  {
    image: require('~/assets/images/Group_35118_5737a383-59d5-4934-bd30-08d94872b47c.webp'),
    alt: 'Custom Spotify Plaque',
  },
  {
    image: require('~/assets/images/Group_35144_1.webp'),
    alt: 'Couple Wall Art',
  },
];

export default function Ban() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {productImages.map((item, index) => (
          <TouchableOpacity key={index} activeOpacity={0.7}>
            <Image source={item.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 10,
    resizeMode: 'contain',
  },
});
