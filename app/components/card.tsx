import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const cardData = [
  {
    img: require('~/assets/images/transaction_1_2eaee27c-2af9-4df1-8def-51d50e3854d8_100x.avif'),
    title: 'Safe Payment',
    desc: 'We take your privacy seriously and protect it with complete security.',
  },
  {
    img: require('~/assets/images/arrow_1_3252f918-c202-426f-9796-f63ac5a91dbd_100x.png'),
    title: 'Secure Logistic',
    desc: 'Package safety - Full refund for your damaged or lost package.',
  },
  {
    img: require('~/assets/images/insurance_1_1_4c25f3d4-543c-409e-923d-5fea976e6770_100x.png'),
    title: 'Secure Privacy',
    desc: 'We take all necessary precautions to protect your personal information.',
  },
  {
    img: require('~/assets/images/global_1_1c58fac9-e205-4691-b6ed-4b38aae5f765_100x.avif'),
    title: 'Express Shipping',
    desc: 'Available as Standard or Express delivery',
  },
];

const logos = [
  require('~/assets/images/rfdtv_200x.png'),
  require('~/assets/images/fox_200x.png'),
  require('~/assets/images/newsnet_200x.png'),
  require('~/assets/images/ncn_200x.png'),
  require('~/assets/images/nbc_200x.png'),
];

export default function Card() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Card Section */}
      <View style={styles.cardGrid}>
        {cardData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.img} style={styles.cardImage} />

            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
            <TouchableOpacity>
              <Text style={styles.learnMore}>Learn More</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* "As seen on" Section */}
      <View style={styles.logoSection}>
        <Text style={styles.sectionTitle}>As seen on</Text>
        <View style={styles.logoGrid}>
          {logos.map((src, index) => (
            <Image key={index} source={src} style={styles.logo} />
          ))}
        </View>
        <Text style={styles.newsText}>And over 200 news sites</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FDF7E7',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    width: '45%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 6,
  },
  learnMore: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  logoSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  logoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  newsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
});
