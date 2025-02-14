import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={{ width: "100%" }}>
      {/* Announcement Bar */}
      <View style={{ backgroundColor: "#f13c20", paddingVertical: 8, paddingHorizontal: 16 }}>
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          🎉 Order 2+ items to SAVE 10% using code: TRC10
        </Text>
      </View>

      {/* Main Header */}
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Logo */}
          <Image
            source={{
              uri: "https://trendingcustom.com/cdn/shop/t/57/assets/logo.svg?v=75357380592425913601684321072",
            }}
            style={styles.logo}
          />

          {/* Input */}
          <TextInput 
            style={styles.input} 
            placeholder="Search..." 
            placeholderTextColor="#888"
          />

          <Link href='/'>Reviews</Link>
          <Link href='/'>Reward</Link>
          <Link href='/'> Track Order</Link>
          <View>
          <Picker><Picker.Item label="US Dollar (USD)" value="USD" />
        <Picker.Item label="Euro (EUR)" value="EUR" />
        <Picker.Item label="Vietnamese Dong (VND)" value="VND" />
        <Picker.Item label="Japanese Yen (JPY)" value="JPY" />ư</Picker>
          </View>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Canh chỉnh hai bên
    gap: 10, // Khoảng cách giữa logo và input
  },
  logo: {
    width: 120, 
    height: 40, 
    resizeMode: "contain",
  },
  input: {
    flex: 1, // Input mở rộng để cân bằng
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
