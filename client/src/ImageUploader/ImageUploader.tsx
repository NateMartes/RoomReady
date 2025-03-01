import React, { useState } from "react";

function ImageUploader({ onImageChange }: { onImageChange: (image: File) => void }) {
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
    <div>
      <div className="images-uploaded">
        {(image !== "") ? (
          <img src={image} alt={`Uploaded ${image}`} width={150}/>
        ) : <></>}
      </div>
      <input className="image-upload-btn" type="file" accept="image/*" multiple onChange={handleImageUpload} />
    </div>
  );
}

export default ImageUploader
