import {useEffect, useState} from "react";
import "./Tmp-Module.module.css"

function Tmp_Module() {

  // Expect response
  interface ApiResponse {
    message: string;
  }

  // State variables
  // NOTE: This function will run anytime this state variables change, in this case, only once
  const [data, setData] = useState<ApiResponse>({
    "message": "Loading..."
  });
  const [error, setError] = useState<string | null>(null);

  // Runs on page load because useEffect does not depend on any other variables, aka ([])
  useEffect(() => {
      try {
        fetch("http://localhost:5000/v1/players/16")
        .then(response => response.json())
        .then((data: ApiResponse) => setData(data));
      } catch (err) {
        setError("There was an error fetching the data.");
      }
  }, []); 

  // Render loading state, error, or data
  if (error) {
    return <h1>{error}</h1>;
  } else {
    return <h1>{data.message}</h1>;
  }
}

export default Tmp_Module;

