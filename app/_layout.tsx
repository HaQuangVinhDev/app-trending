import { Stack, Link } from 'expo-router';
import { View } from 'lucide-react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="bestsellermain" options={{ title: 'Bán chạy nhất' }} />
    </Stack>
  );
}
