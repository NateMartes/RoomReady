import React, { useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader.tsx";
import Location from "../Location/Location.tsx";
import Response from "../Response/Response.tsx";

function DataForm() {

  interface locationData {
    latitude: number;
    longitude: number;
  }

  interface response {
    total_risk: number;
    summary: string;
    risks: [string, string, string][];
  }

  const test_result: response = {
    "total_risk": 67,
    "summary": "sdbfyshfbusbrfebdrfryusbfhu wrufbsuhbfhuswbfwhedfubwifdjefnwuifhghuwifhswjfnbwfwbifbw",
    "risks": [
    ["R1", "Description", "Imporvments"],
    ["R2", "Description", "Imporvments"],
    ["Bad windows", "pfgmnerhjtbgruiedhbgth uefgthjewr3edhifujdhergwyuhff\
    jigerbnfjnewhrfbhi ifdrewbfuidfi gnrgejbdgerti yuebfghuebffgfui9efjhuefhuii", "ANOTHER DESCIRPTION!!!"]
    ]
  }

  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<locationData | null>(null);
  const [result, setResult] = useState<response | null>(null);

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
      
       formData.append("file", image);

       const request = {
        method: "POST",
        body: formData,
       };
    
       console.log(request)
       if (location) {
          console.log(`LOCATION: ${location.latitude} ${location.longitude}`);
          const response = await fetch(`http://localhost:8080/upload?longitude=${location.longitude}&latitude=${location.latitude}`, request)
          console.log(response);
          const newResult = await response.json();
          setResult(test_result) //CHANGE THIS!!!
      }

    } catch (error) {
      console.error("Error uploading images:", error);
    }  
  };

  return (
    result ? (
      <Response result={result} />
    ) : (
      <form onSubmit={sendDataToServer}>
        <ImageUploader onImageChange={handleImageChange} />
        <Location onLocationChange={handleLocationChange} />
        <button type="submit" disabled={!location || !image}>Send Data</button>
      </form>
    )
  );
}

export default DataForm;

