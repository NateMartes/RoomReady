import Risk from '../Risk/Risk.tsx'
import styles from './Response.module.css'
import {useState} from 'react'

interface response {
  total_risk: number
  Summary: string
  risks: [string, string, string][]
}

function Response({ result }: { result: response }) {

  const [riskStates, setRiskStates] = useState<boolean[]>(new Array(result.risks.length).fill(false));
  
  const handleRisksChange = (newRisk: boolean, index: number) => {
    setRiskStates((prevRisks) => {
      const updatedRisks = [...prevRisks];
      updatedRisks[index] = newRisk;
      return updatedRisks;
    })
  };

  if (!result) return <div>Loading..</div>;
  return ( 
    <div className={styles.responseContainer}>
    <h2>Risk Analysis Assessment Finish! {result.total_risk}</h2>
    <p>{result.Summary}</p>
    {result.risks.map((array, index) => (<Risk key={index} name={array[0]} desc={array[1]} imprv={array[2]} onRiskChange={handleRisksChange} index={index}/>))}
    </div>
  );
}

export default Response
