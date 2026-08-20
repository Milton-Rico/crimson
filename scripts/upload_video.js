import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import process from 'node:process';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET
});

const videoPath = path.resolve('src/assets/videos/herovideo1.MP4');


console.log('Starting large upload for:', videoPath);

cloudinary.uploader.upload_large(videoPath, {
  resource_type: "video",
  public_id: "herovideo",
  chunk_size: 6000000 // 6MB chunks
}, (error, result) => {
  if (error) {
    console.error('Upload failed:', error);
  } else {
    console.log('Upload successful!');
    console.log('URL:', result.secure_url);
  }
});
