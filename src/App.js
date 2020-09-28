import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const BASE_API = 'https://disease.sh/v3/covid-19';
  console.log('re render');
  const [countries, setCountries] = useState([]);

  const [country, setCountry] = useState('worldwide');

  const handleCountryChange = (evt) => {
    evt.preventDefault();
    setCountry(evt.target.value);
  };

  useEffect(() => {
    const FetchCountries = async () => {
      console.log('useeffect');
      let response = await axios.get(`${BASE_API}/countries`);
      let countries = response.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      setCountries(countries);
    };
    FetchCountries();
  }, []);

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID_19 TRACKER</h1>
        <FormControl className='app__dropdown'>
          <Select
            variant='outlined'
            value={country}
            onChange={handleCountryChange}
          >
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.name} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* header */}
      {/* title & select box */}

      <div className='app__stats'></div>
      {/* InfoBox */}
      {/* InfoBox */}
      {/* InfoBox */}

      {/* Map */}

      {/* table */}
      {/* graph */}
    </div>
  );
}

export default App;
