// uploadImage.ts
import * as ImagePicker from 'expo-image-picker';

const CLOUD_NAME = 'dwg8jrkdn'; // Thay bằng Cloud Name của bạn
const UPLOAD_PRESET = 'expo_upload'; // Thay bằng Upload Preset của bạn

export async function pickAndUploadImage(): Promise<string | null> {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    alert('Permission to access gallery is required!');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    return uploadImage(imageUri);
  }
  return null;
}

export async function uploadImage(imageUri: string): Promise<string | null> {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  } as any);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return data.secure_url; // Trả về URL ảnh
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
}
