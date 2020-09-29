import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import InfoBox from './InfoBox';
import Map from './Map';
function App() {
  const BASE_API = 'https://disease.sh/v3/covid-19';
  console.log('re render');
  const [countries, setCountries] = useState([]);

  const [country, setCountry] = useState('worldwide');

  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const handleCountryChange = (evt) => {
    evt.preventDefault();
    const countryCode = evt.target.value;
    setCountry(countryCode);
  };

  useEffect(() => {
    const FetchCountryInfo = async () => {
      const url =
        country === 'worldwide'
          ? `${BASE_API}/all`
          : `${BASE_API}/countries/${country}`;
      const response = await axios.get(url);
      setCountryInfo(response.data);
    };
    FetchCountryInfo();
  }, [country]);
  //fetches all countries to list in Select
  useEffect(() => {
    const FetchCountries = async () => {
      console.log('useeffect');
      let response = await axios.get(`${BASE_API}/countries`);
      let countriesData = response.data;
      let countries = response.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      setTableData(countriesData);
      setCountries(countries);
    };
    FetchCountries();
  }, []);

  return (
    <div className='app'>
      <div className='app__left'>
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
        <div className='app__stats'>
          <InfoBox
            title='Coronavirus cases'
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <InfoBox
            title='Recovered'
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox
            title='Deaths'
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          <p>Table</p>
          {/* table */}
          <p>Graph</p>
          {/* graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
