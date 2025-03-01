import React, { useState } from "react";

function ImageUploader() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  return (
    <div>
      <div className="images-uploaded">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Uploaded ${index}`} width={150}/>
        ))}
      </div>
      <input className="image-upload-btn" type="file" accept="image/*" multiple onChange={handleImageUpload} />
    </div>
  );
}

export default ImageUploader
