import React, { useEffect, useState } from "react";

function Location( { onLocationChange }: { onLocationChange: (location: LocationData) => void}) {
  
  interface LocationData {
    "longitude": number;
    "latitude": number;
  }

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationData | null>(null);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    if (isEnabled) {
      getUserLocation();
    }
  }, [isEnabled]);

  return (
    <div>
      <label>
        Enable Location:
        <input type="checkbox" onChange={handleSwitchChange}/>
      </label>
    </div>
  );
};

export default Location;

