import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter  from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [flag, setFlag] = useState('')


  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('response', response.data)
        setCountries(response.data)
      })
  }, [])


  
  const filteredCountries = countries.filter(country => country.name.common.toUpperCase().includes(newFilter.toUpperCase()))

  useEffect(() => {
    if (filteredCountries.length === 1) {
    const url = filteredCountries[0].flags.png
    console.log('url', url)
    setFlag(url)
    }
    else {
      setFlag('')
    }
  }, [filteredCountries])



  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <Filter newFilter={newFilter} handleFilter={handleFilterChange}/>
      <Countries countries={filteredCountries} flag={flag} setFlag={setFlag}/>
    </div>
  )

}

export default App