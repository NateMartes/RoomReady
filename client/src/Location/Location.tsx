import React, { useEffect, useState } from "react";

function Location() {
  
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
      <div>
        {isEnabled ? (
          location ? (
            <p>{location.latitude}, {location.longitude}</p>
          ) : (
            <p>Fetching location...</p>
          )
        ) : (
          <p>{isEnabled} Switch is off. Location will be fetched when enabled.</p>
        )}
      </div>
    </div>
  );
};

export default Location;

