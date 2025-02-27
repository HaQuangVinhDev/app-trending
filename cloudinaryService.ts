import * as ImagePicker from 'expo-image-picker';

const CLOUD_NAME = 'dwg8jrkdn'; // 🔹 Thay bằng Cloud Name của bạn
const UPLOAD_PRESET = 'expo_upload'; // 🔹 Thay bằng Upload Preset bạn đã tạo

export async function pickAndUploadImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Thay đổi cú pháp mới
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    return uploadImage(imageUri);
  }
  return null;
}

export async function uploadImage(imageUri: string) {
  let formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  } as any);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    let response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    let data = await response.json();
    return data.secure_url; // 🔹 URL ảnh sau khi upload thành công
  } catch (error) {
    console.error('Upload failed', error);
    return null;
  }
}
