import { useEffect, useState } from "react";
import styles from "./Location.module.css"

  interface locationData {
    "longitude": number;
    "latitude": number;
  }

function Location ( { onLocationChange , switchLocation}: { switchLocation: (location: locationData) => void, setLocationOnChange: () => void}) {
  
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [_, setLocation] = useState<locationData | null>(null);

  const handleSwitchChange = () => {
    setIsEnabled((prevState) => !prevState);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ longitude, latitude });
          onLocationChange({ longitude, latitude});
        },
        (error) => {
          // Geo location not allowed
          console.log(error)
          setLocation(null);
        }
      );
    } else {
      // Geo location not supported
      setLocation(null);
    }
  };

  // Trigger location fetching when switch is enabled
  useEffect(() => {
    switchLocation();
    if (isEnabled) {
      getUserLocation();
    } else {
      setLocation(null);
    }
  }, [isEnabled]);

  return (
      <label className={styles.switchContainer}>
        <input type="checkbox" className={styles.switchInput} onChange={handleSwitchChange}/>
        <span className={styles.switchSlider}></span>
        <span className={styles.switchText}>Use Location in Analysis</span>
      </label>
  );
};

export default Location;

