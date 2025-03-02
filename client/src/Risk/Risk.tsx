function Risk( {name, desc, imprv} ) {
  return (
      <div>
          <h3>Risk {name}<input type="checkbox"/></h3>
          <p>{desc}</p>
          <h4>Improvments</h4>
          <p>{imprv}</p>
      </div>
  );
}

export default Risk
