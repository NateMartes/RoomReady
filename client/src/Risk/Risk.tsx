import { useState } from "react"
import styles from "./Risk.module.css"


function Risk( {name, desc, imprv, onRiskChange, index}: {name: string, desc: string, imprv: string, onRiskChange: (bool: boolean, int: number) => void, index: number} ) {

  const [isRisk, setIsRisk] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRisk = e.target.checked;
    setIsRisk(newRisk);
    onRiskChange(newRisk, index);
  };
  return (
      <div>
          <h3>{name}
          <div className={styles.checkboxWrapper26}><input type="checkbox" id={index}/>
          <label htmlFor={index}><div className={styles.tickMark}></div></label></div></h3>
          <p>{desc}</p>
          <h4>Improvments</h4>
          <p>{imprv}</p>
      </div>
  );
}

export default Risk
