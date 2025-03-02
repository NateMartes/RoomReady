import React, { useState } from "react";
import styles from './ImageUploader.module.css';
import Location from '../Location/Location.tsx';

  interface locationData {
    latitude: number;
    longitude: number;
  }

  interface ImageUploaderProps {
    onImageChange: (image: File) => void;
    onLocationChange: (location: LocationData) => void;
    switchLocation: () => void;
}

function ImageUploader({ onImageChange, onLocationChange , switchLocation}: ImageUploaderProps) {
  const [image, setImage] = useState<string>("");
  const [_, setImageFile] = useState<File>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {

      const newImage = URL.createObjectURL(files[0]);
      const newFile = files[0]

      setImage(newImage)
      setImageFile(newFile);
      onImageChange(newFile);
    }
  };

  return (
      <div className={styles.container}>
        {image && (
          <img className={styles.image} src={image} alt={`Uploaded ${image}`} width={300}/>
        )}
      {/* Custom File Input Button */}
      <div className={styles.fileInputContainer}>
        {/* Hidden file input */}
        <input
          className={styles.fileInput}
          type="file"
          id="file-input"
          onChange={handleImageUpload}
          accept="image/*"
        />
        
        {/* Custom label button */}
        <label htmlFor="file-input" className="button">
          Upload Image
        </label>
        <Location onLocationChange={onLocationChange} switchLocation={switchLocation} />
      </div>
    </div>
  );
}

export default ImageUploader
