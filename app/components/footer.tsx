import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';

interface FooterSectionProps {
  title: string;
  items: string[];
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, items }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {items.map((item) => (
      <TouchableOpacity key={item} onPress={() => Linking.openURL('#')}>
        <Text style={styles.sectionItem}>{item}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const SocialIcon: React.FC<{ name: string }> = ({ name }) => (
  <TouchableOpacity onPress={() => Linking.openURL('#')}>
    <Image
      source={{ uri: `https://trendingcustom.com/cdn/shop/t/57/assets/${name}.svg?v=40076760842241353711684321067` }}
      style={styles.socialIcon}
    />
  </TouchableOpacity>
);

const PaymentIcon: React.FC<{ name: string }> = ({ name }) => (
  <Image
    source={{ uri: `https://trendingcustom.com/cdn/shop/t/57/assets/${name}.svg?v=60147985054043600351684321072` }}
    style={styles.paymentIcon}
  />
);

export default function Footer() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <FooterSection title="Information" items={['Home', 'Shop', 'Blog', 'Contact Us']} />

        <FooterSection
          title="Policies"
          items={[
            'Privacy Policy',
            'Cancellation & Modification',
            'Replacement & Refund Policy',
            'Shipping Policy',
            'Payment Method',
            'Terms of Service',
            'Intellectual Property Claim',
          ]}
        />

        <FooterSection title="Help" items={['Help content', 'Contact Us', 'Size Guide', 'Valentine Cutoff Date']} />

        <View style={styles.section}>
          <Image
            source={{ uri: 'https://trendingcustom.com/cdn/shop/t/57/assets/logo.svg?v=75357380592425913601684321072' }}
            style={styles.logo}
          />
          <Text style={styles.sectionTitle}>Get in touch?</Text>
          <Text style={styles.contactInfo}>
            <Text style={styles.bold}>Email 24/7:</Text> Foli@example.com
          </Text>
          <Text style={styles.contactInfo}>
            <Text style={styles.bold}>Live chat:</Text> Online from 9.30 AM to 5 PM (PST), Mon-Sun
          </Text>
          <Text style={styles.contactInfo}>
            <Text style={styles.bold}>US Warehouse:</Text> 584 Castro Street #3053, San Francisco, CA 94114
          </Text>
          <Text style={styles.contactInfo}>
            <Text style={styles.bold}>Canada:</Text> 422 Richards St, Vancouver, BC V6B 2Z4
          </Text>
          <Text style={styles.contactInfo}>
            <Text style={styles.bold}>Singapore:</Text> 66 Rangoon Road, #02-66, R66 Apartments, Singapore 218356
          </Text>

          <View style={styles.socialIcons}>
            {['facebook', 'youtube', 'pinterest', 'google'].map((social) => (
              <SocialIcon key={social} name={social} />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.trustSection}>
          <Image
            source={{
              uri: 'https://images.dmca.com/Badges/_dmca_premi_badge_4.png?ID=6215c2ff-22c6-4a51-ac3d-f4ff89588f3c',
            }}
            style={styles.dmcaIcon}
          />
          <TouchableOpacity style={styles.trustButton} onPress={() => Linking.openURL('/')}>
            <Text style={styles.trustButtonText}>Review us on Trustpilot</Text>
          </TouchableOpacity>
          <Text style={styles.trustedText}>Trusted by more than 2M+ customers</Text>
        </View>

        <View style={styles.paymentIcons}>
          {['mcafee', 'applepay', 'paypal', 'visa', 'mastercard', 'americanexpress'].map((payment) => (
            <PaymentIcon key={payment} name={payment} />
          ))}
        </View>

        <Text style={styles.copyright}>© {new Date().getFullYear()} TrendingCustom™️ | Powered by Shopify</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionItem: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  logo: {
    width: 144,
    height: 36,
    marginBottom: 16,
  },
  contactInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    padding: 16,
  },
  trustSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  dmcaIcon: {
    height: 24,
    width: 100,
    marginBottom: 8,
  },
  trustButton: {
    borderWidth: 1,
    borderColor: '#22c55e',
    padding: 8,
    borderRadius: 4,
  },
  trustButtonText: {
    color: '#22c55e',
  },
  trustedText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
  paymentIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  paymentIcon: {
    width: 40,
    height: 24,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
