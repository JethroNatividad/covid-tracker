import React from 'react';
import { actions } from './reducer';
import { Card, CardContent, Typography } from '@material-ui/core';
import { capitalizeFirstLetter, formatNumber } from './helpers';
import { useCountriesContext, useCountriesDispatch } from './CountriesProvider';
import './InfoBox.css';
function InfoBox({ title, caseType }) {
  //context data
  const { countryInfo, casesType } = useCountriesContext();
  const { dispatch } = useCountriesDispatch();

  //this checks the current selected infobox, returns true if it is
  const active = caseType === casesType;

  //this returns the total cases of a case type from the data,
  const total = countryInfo[caseType];

  //this returns the number of todays cases of a case type
  const cases = countryInfo[`today${capitalizeFirstLetter(caseType)}`];

  //this dictionary contains the color of each casetype
  const color = {
    cases: ' #CC1034',
    recovered: ' #7dd71d',
    deaths: ' #fb4443',
  };

  const handleClick = () => {
    //this sets the case type to the current case type if clicked
    dispatch({ type: actions.SET_CASES_TYPE, data: caseType });
  };
  return (
    <Card
      className='infoBox'
      /* here checks if the box is active, adds bordertop if true */
      style={{ borderTop: active && `10px solid ${color[caseType]}` }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>
        <h2 className='infoBox__cases' style={{ color: color[caseType] }}>
          + {formatNumber(cases)}
        </h2>
        <Typography className='infoBox__total' color='textSecondary'>
          {formatNumber(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
