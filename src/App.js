import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useEffect } from 'react';
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
  //fetches the country info of the Country
  //example value of Country, 'worldwide', 'UK', 'AF
  useEffect(() => {
    const FetchCountryInfo = async () => {
      //builds the url
      const url =
        //if the country is worldwide, return ${BASE_API}/all
        //return request ${BASE_API}/countries/${country}
        country === 'worldwide'
          ? `${BASE_API}/all`
          : `${BASE_API}/countries/${country}`;

      // Get reuquest on the url
      const response = await axios.get(url);
      const data = response.data;

      //sets the country info to the response data
      dispatch({ type: actions.SET_COUNTRY_INFO, data: data });

      //checks if the country is worldwide
      if (country === 'worldwide') {
        //if it is, change the map view to the middle of the earth
        //set center to lat 34.80746, lng -40.4796
        dispatch({
          type: actions.SET_MAP_CENTERZOOM,
          center: {
            lat: 34.80746,
            lng: -40.4796,
          },
          zoom: 3,
        });
      } else {
        //change the map view to the lat, long of the country,
        //given by the api
        //set center to lat: data.countryInfo.lat, lng: data.countryInfo.long
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
    //DEPENDENCY = country
  }, [country]);

  //fetches all countries
  useEffect(() => {
    const FetchCountries = async () => {
      // get request to the ${BASE_API}/countries
      let response = await axios.get(`${BASE_API}/countries`);
      let data = response.data;

      // for the Select dropworn, take the name and value of each country
      let allcountries = await response.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));

      //sorts the number of cases desc
      const sortedByCases = sortData(data);

      //Sets the table data to the data sorted by number of cases
      dispatch({ type: actions.SET_TABLE_DATA, data: sortedByCases });

      //sets the countries for the dropdown
      dispatch({ type: actions.SET_COUNTRIES, data: allcountries });

      //sets the data for map countries. the circle things in the map
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
