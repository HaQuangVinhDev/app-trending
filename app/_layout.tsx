import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  // Xử lý vuốt sang trái và phải
  const handleSwipe = (gestureName: string) => {
    if (gestureName === 'SWIPE_LEFT') {
      router.push('/bestsellermain'); // Chuyển đến trang tiếp theo
    } else if (gestureName === 'SWIPE_RIGHT') {
      router.back();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <GestureRecognizer
          onSwipeLeft={() => handleSwipe('SWIPE_LEFT')}
          onSwipeRight={() => handleSwipe('SWIPE_RIGHT')}
          config={{
            velocityThreshold: 0.5,
            directionalOffsetThreshold: screenWidth * 0.25, // Vuốt ít nhất 20% màn hình
          }}
          style={styles.gestureContainer}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="bestsellermain" />
            <Stack.Screen name="thumbnail" />
          </Stack>
        </GestureRecognizer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Đảm bảo có màu nền khi safe area được áp dụng
  },
  gestureContainer: {
    flex: 1,
  },
});
