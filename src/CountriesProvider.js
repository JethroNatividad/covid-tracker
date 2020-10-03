import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { actions } from './reducer';
import { buildChartData, sortData } from './helpers';
import { stateReducer, initialState } from './reducer';

const CountriesContext = createContext();
const CountriesDispatch = createContext();

export const CountriesProvider = ({ children }) => {
  const BASE_API = 'https://disease.sh/v3/covid-19';
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { country, casesType } = state;

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

  useEffect(() => {
    const FetchData = async () => {
      const response = await axios.get(
        `${BASE_API}/historical/all?lastdays=120`
      );
      const chartData = buildChartData(response.data, casesType);
      dispatch({ type: actions.SET_LINEGRAPH_DATA, data: chartData });
    };
    FetchData();
  }, [casesType]);
  return (
    <CountriesContext.Provider value={{ ...state }}>
      <CountriesDispatch.Provider value={{ dispatch: dispatch }}>
        {children}
      </CountriesDispatch.Provider>
    </CountriesContext.Provider>
  );
};
export const useCountriesContext = () => useContext(CountriesContext);
export const useCountriesDispatch = () => useContext(CountriesDispatch);
