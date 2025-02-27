import { Button, View } from 'react-native';
import { pickAndUploadImage } from '../../cloudinaryService';
import { useState } from 'react';
import { Image } from 'react-native';
export default function Dashboard() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleUpload = async () => {
    const url = await pickAndUploadImage();
    if (url) {
      setImageUrl(url);
    }
  };
  return (
    <View>
      <Button title="Upload Image" onPress={handleUpload} />
      {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
