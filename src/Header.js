import { FormControl, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import './Header.css';
import { useCountriesContext } from './CountriesProvider';
import { actions } from './reducer';

function Header() {
  const { dispatch, countries, country } = useCountriesContext();
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
    <div className='header'>
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
  );
}

export default Header;
