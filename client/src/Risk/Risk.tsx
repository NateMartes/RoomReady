import { useState } from "react"


function Risk( {name, desc, imprv, onRiskChange, index}: {name: string, desc: string, imprv: string, onRiskChange: (bool: boolean, int: number) => void, index: number} ) {

  const [isRisk, setIsRisk] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRisk = e.target.checked;
    setIsRisk(newRisk);
    onRiskChange(newRisk, index);
  };
  return (
      <div>
          <h3>Risk {name}<input type="checkbox" onClick={handleChange}/></h3>
          <p>{desc}</p>
          <h4>Improvments</h4>
          <p>{imprv}</p>
      </div>
  );
}

export default Risk
