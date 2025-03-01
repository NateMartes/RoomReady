import React, { useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader.tsx";
import Location from "../Location/Location.tsx";

function DataForm() {

  interface locationData {
    latitude: number;
    longitude: number;
  }

  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<locationData | null>(null);

  const handleImageChange = (newImage: File) => {
    setImage(newImage);
  };

  const handleLocationChange = (newLocation: locationData | null) => {
    setLocation(newLocation);
  };
  const sendDataToServer =  async (event: React.FormEvent) => {
  event.preventDefault()
  const formData = new FormData();
    try {
      
       formData.append("image", image);

       const request = {
        method: "POST",
        body: formData, // Send the raw binary data for each image
       };
    
       console.log(request)
       if (location) {
          console.log(`LOCATION: ${location.latitude} ${location.longitude}`);
          const response = await fetch(`http://localhost:8080/upload?longitude=${location.longitude}&latitude=${location.latitude}`, request)
          console.log(response);
       }
        // const result = await response.json();
        // console.log("Upload successful:", result);

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

