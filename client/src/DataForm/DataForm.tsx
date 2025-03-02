import React, { useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader.tsx";
import Location from "../Location/Location.tsx";
import Response from "../Response/Response.tsx";
import LoadingIcon from "../assets/Dark_Mode_Load.svg";
import styles from "./DataForm.module.css"

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
  const [isLocationOn, setLocationOn] = useState<bool>(false);
  const [result, setResult] = useState<response | null>(null);
  const [isLoading, setIsLoading] = useState<bool>(false);

  const handleImageChange = (newImage: File) => {
    setImage(newImage);
  };

  const handleLocationChange = (newLocation: locationData | null) => {
    setLocation(newLocation);
  };

  const setLocationOnChange = () => {
    setLocationOn((prevState) => {
      const newState = !prevState;
      return newState;
    })
  };

  const sendDataToServer =  async (event: React.FormEvent) => {
  event.preventDefault()
  setIsLoading(true);

  const submitButton = event.currentTarget.querySelector("button[type='submit']");
  if (submitButton) {
    submitButton.disabled = true;
  }

  const formData = new FormData();
    try {
      
       formData.append("file", image);

       const request = {
        method: "POST",
        body: formData,
       };
    
       console.log(request)
       if (location) {
          const response = await fetch(`http://localhost:8080/upload?longitude=${location.longitude}&latitude=${location.latitude}`, request)
          let newResult = await response.json();
          setIsLoading(false);
          if (newResult.summary === "") {
            newResult = {}
            submitButton.disabled = false;
          }
          setResult(newResult);
      } else {
          const response = await fetch(`http://localhost:8080/upload/`, request)
          let newResult = await response.json();
          setIsLoading(false);
          if (newResult.summary === "") {
            newResult = {}
            submitButton.disabled = false;
          }
          setResult(newResult);
      }

    } catch (error) {
      console.error("Error uploading images:", error);
    }  
  };

  const form = (<form onSubmit={sendDataToServer}>
        <div className="formElements">
          <ImageUploader onImageChange={handleImageChange} onLocationChange={handleLocationChange} switchLocation={setLocationOnChange}/>
        </div>
        <div className="submitContainer">
          <button className="button" type="submit" disabled={!image || (isLocationOn && !location) ||
          (isLocationOn && location && !image)}>Analyze!</button>
          {isLoading ? <img style={{margin: "0", verticalAlign: 'middle'} }src={LoadingIcon} 
          type="image/svg" alt="Loading" width="36px"/> : null}
        </div>
      </form>
    );


  return (
    result ? (Object.keys(result).length !== 0 ?
    <>
    <img className={styles.image} src={URL.createObjectURL(image)} alt={`Uploaded ${image}`} width={300}/>
    <Response result={result} /></> : 
    <>{form}<p>Not recgonzied as a valid image.</p></>) : form 
  );
}

export default DataForm;

