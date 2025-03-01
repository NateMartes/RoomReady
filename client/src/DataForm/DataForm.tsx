import React, { useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader.tsx";
import Location from "../Location/Location.tsx";

function DataForm() {

  interface locationData {
  latitude: number;
  longitude: number;
  }

  const [image, setImage] = useState<File>(null);
  const [location, setLocation] = useState<locationData | null>(null);
  const reader = new FileReader();

  const handleImageChange = (newImage: File) => {
    setImage(newImage);
  };

  const handleLocationChange = (newLocation: locationData | null) => {
    setLocation(newLocation);
  };
  const sendDataToServer = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.preventDefault()
    try {
       const reader = new FileReader();

       reader.onload = async () => {
          const rawData = reader.result as ArrayBuffer;
          const request = {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream", // Send as raw binary data
            },
            body: rawData, // Send the raw binary data for each image
          };
          console.log(request)
          const response = await fetch(`https://localhost:8080/upload?longitude=${location.longitude}?latitude=${location.latitude}`, request) 
        // const result = await response.json();
        // console.log("Upload successful:", result);
      };
      reader.readAsArrayBuffer(image);

    } catch (error) {
      console.error("Error uploading images:", error);
    }  
  };

  return (
    <form onSubmit={sendDataToServer}>

      <ImageUploader onImageChange={handleImageChange} />

      <Location onLocationChange={handleLocationChange} />

      <button type="submit">Send Data</button>
    </form>
  );
};

export default DataForm;

