

const Countries = ({countries, flag}) => {
    console.log('maat', countries)
  
    const imageStyle = {
      paddingTop: "10px",
    }
  
  if (countries.length > 10 || countries.length == 0) {
    return (
    <>
    <div>Too much matches, specify another filter</div>
    </>
    )
  }
  
  
  else if (countries.length > 1)
  
    return (
      <>
    <ul>
      {countries.map(country => 
        <li key={country.name.official}>{country.name.common}</li>
      )}
      </ul>
      </>
    )
  
    else {
      /*console.log('testi', Object.entries(countries[0]))
      console.log('flag', flag)*/
  
  
      return (
        <>
          <h1>{countries[0].name.common}</h1>
          <div>capital {countries[0].capital}</div>
          <div>area {countries[0].area}</div>
          <h3>languages:</h3>
          <ul>
          {Object.entries(countries[0].languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
          </ul>
          <div style={imageStyle}><img src={flag} alt={`Flag of ${countries[0].name.common}`} /></div>
        </>
      )
    }
  }

  
  export default Countries