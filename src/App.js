import React from 'react';
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core';
import './App.css';
import { actions } from './reducer';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import Linegraph from './Linegraph';
import 'leaflet/dist/leaflet.css';
import { useCountriesContext } from './CountriesProvider';
function App() {
  //CONTEXT STATE
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

  //runs if Select country changes
  const handleCountryChange = (evt) => {
    //prevents page refresh
    evt.preventDefault();

    //country code value
    const countryCode = evt.target.value;

    //set the current country to the country code
    dispatch({ type: actions.SET_COUNTRY, data: countryCode });
  };

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
