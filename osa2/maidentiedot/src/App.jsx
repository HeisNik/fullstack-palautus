import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter  from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [flag, setFlag] = useState('')
  const [weather, setWeather] = useState({ icon: null, temp: null, wind: null })


  const api_key = import.meta.env.VITE_SOME_KEY
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  
  const filteredCountries = countries.filter(country => country.name.common.toUpperCase().includes(newFilter.toUpperCase()))

  useEffect(() => {
    if (filteredCountries.length === 1) {
    const url = filteredCountries[0].flags.png
    setFlag(url)
    }
  }, [filteredCountries])


  const showCountry = (name) => {
    setNewFilter(name)  
  }


  useEffect(() => {
    if (filteredCountries.length === 1) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${filteredCountries[0].capitalInfo.latlng[0]}&lon=${filteredCountries[0].capitalInfo.latlng[1]}&appid=${api_key}&units=metric`
    axios
    .get(weatherUrl)
    .then(response => {
      const icon = response.data.weather[0].icon
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
      const temperature = response.data.main.temp
      const wind = response.data.wind.speed
      setWeather({ icon: iconUrl, temp: temperature, wind: wind })
    })

    } 
  }, [flag])




  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <Filter newFilter={newFilter} handleFilter={handleFilterChange}/>
      <Countries countries={filteredCountries} flag={flag} showCountry={showCountry} weather={weather}/>
    </div>
  )

}

export default App