import Risk from '../Risk/Risk.tsx'
import styles from './Response.module.css'

interface response {
  total_risk: number
  Summary: string
  risks: [string, string, string][]
}

function Response({ result }: { result: response }) {
  if (!result) return <div>Loading..</div>
  return ( 
    <div className={styles.responseContainer}>
    <h2>Risk Analysis Assessment Finish! {result.total_risk}</h2>
    <p>{result.Summary}</p>
    {result.risks.map((array, index) => (<Risk key={index} name={array[0]} desc={array[1]} imprv={array[2]}/>))}
    </div>
  );
}

export default Response
