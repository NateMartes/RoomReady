import React, { useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader.tsx";
import Location from "../Location/Location.tsx";

function DataForm() {

  interface locationData {
    latitude: number;
    longitude: number;
  }

  const [image, setImage] = useState<Blob | null>(null);
  const [location, setLocation] = useState<locationData | null>(null);

  const handleImageChange = (newImage: File) => {
    setImage(newImage);
  };

  const handleLocationChange = (newLocation: locationData | null) => {
    setLocation(newLocation);
  };
  const sendDataToServer = (event: React.FormEvent) => {
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
          if (location) {
            const response = await fetch(`http://localhost:8080/upload?longitude=${location.longitude}&latitude=${location.latitude}`, request)
            console.log(response);
          }
        // const result = await response.json();
        // console.log("Upload successful:", result);
      };
      if (image instanceof Blob) {
        reader.readAsArrayBuffer(image);
      }

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

