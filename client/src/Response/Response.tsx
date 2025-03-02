import Risk from '../Risk/Risk.tsx'

interface response {
  total_risk: number
  summary: string
  risks: [string, string, string][]
}

function Response({ result }: { result: response }) {
  if (!result) return <div>Loading..</div>
  return ( 
    <div>
    <h2>Total Risk {result.total_risk}</h2>
    <p>{result.summary}</p>
    {result.risks.map((array, index) => (<Risk key={index} name="Tmp" desc="Tmp" imprv="Tmp"/>))}
    </div>
  );
}

export default Response
