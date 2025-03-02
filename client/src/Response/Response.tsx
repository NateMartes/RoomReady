import Risk from '../Risk/Risk.tsx'
import styles from './Response.module.css'
import {useState} from 'react'

interface response {
  total_risk: number
  Summary: string
  risks: [string, string, string][]
}

function Response({ result }: { result: response }) {

  const [rm, setRm] = useState<number>(0);
  const [riskStates, setRiskStates] = useState<boolean[]>(new Array(result.risks.length).fill(false));
  
  const handleRisksChange = (newRisk: boolean, index: number) => {
    setRiskStates((prevRisks) => {
      const updatedRisks = [...prevRisks];
      updatedRisks[index] = newRisk;
      const val = (newRisk) ? 1 : -1; 
      setRm((prevRm) => (prevRm + val) /  updatedRisks.length)
      return updatedRisks;
    })
  };

  if (!result) return <div>Loading..</div>;
  return ( 
    <div className={styles.responseContainer}>
    <h2>Risk Analysis Completed! {result.total_risk}</h2>
    <p>{result.Summary}</p>
    {result.risks.map((array, index) => (<Risk key={index} name={array[0]} desc={array[1]} imprv={array[2]} onRiskChange={handleRisksChange} index={index}/>))}
    <br/>
    <h2 className={styles.riskMid}>Risk Mitigated: {rm}%</h2>
    </div>
  );
}

export default Response
