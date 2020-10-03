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
import Table from './Table';
import { sortData } from './helpers';
import Linegraph from './Linegraph';
import 'leaflet/dist/leaflet.css';
import { useCountriesContext } from './CountriesProvider';
import { actions } from './reducer';
function App() {
  const {
    dispatch,
    countries,
    country,
    countryInfo,
    tableData,
    mapCountries,
    mapCenter,
    mapZoom,
    casesType,
  } = useCountriesContext();

  const BASE_API = 'https://disease.sh/v3/covid-19';
  console.log('re render');
  const handleCountryChange = (evt) => {
    evt.preventDefault();
    const countryCode = evt.target.value;
    dispatch({ type: actions.SET_COUNTRY, data: countryCode });
  };

  useEffect(() => {
    const FetchCountryInfo = async () => {
      const url =
        country === 'worldwide'
          ? `${BASE_API}/all`
          : `${BASE_API}/countries/${country}`;
      const response = await axios.get(url);
      const data = response.data;
      dispatch({ type: actions.SET_COUNTRY_INFO, data: data });
      if (country === 'worldwide') {
        dispatch({
          type: actions.SET_MAP_CENTERZOOM,
          center: {
            lat: 34.80746,
            lng: -40.4796,
          },
          zoom: 3,
        });
      } else {
        dispatch({
          type: actions.SET_MAP_CENTERZOOM,
          center: {
            lat: data.countryInfo.lat,
            lng: data.countryInfo.long,
          },
          zoom: 4,
        });
      }
    };
    FetchCountryInfo();
  }, [country]);

  //fetches all countries to list in Select
  useEffect(() => {
    const FetchCountries = async () => {
      console.log('useeffect');
      let response = await axios.get(`${BASE_API}/countries`);
      let data = response.data;
      let allcountries = await response.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const sortedByCases = sortData(data);
      dispatch({ type: actions.SET_TABLE_DATA, data: sortedByCases });
      dispatch({ type: actions.SET_COUNTRIES, data: allcountries });
      dispatch({ type: actions.SET_MAP_COUNTRIES, data: data });
    };
    FetchCountries();
  }, []);

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={handleCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries?.map((country) => (
                <MenuItem key={country.name} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox
            casesType='cases'
            active={casesType === 'cases'}
            handleClick={() =>
              dispatch({ type: actions.SET_CASES_TYPE, data: 'cases' })
            }
            title='Coronavirus cases'
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <InfoBox
            casesType='recovered'
            active={casesType === 'recovered'}
            handleClick={() =>
              dispatch({ type: actions.SET_CASES_TYPE, data: 'recovered' })
            }
            title='Recovered'
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox
            casesType='deaths'
            active={casesType === 'deaths'}
            handleClick={() =>
              dispatch({ type: actions.SET_CASES_TYPE, data: 'deaths' })
            }
            title='Deaths'
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <Map
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>
      <Card className='app__right'>
        <CardContent>
          <strong>LIVE CASES BY COUNTRY</strong>
          <Table data={tableData} />
          <div className='app__graph'>
            <strong>WORLDWIDE NEW {casesType.toUpperCase()}</strong>
            <Linegraph BASE_API={BASE_API} casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
