import { Card, CardContent, Typography } from '@material-ui/core';
import { capitalizeFirstLetter, formatNumber } from './helpers';
import React from 'react';
import './InfoBox.css';
import { useCountriesContext, useCountriesDispatch } from './CountriesProvider';
import { actions } from './reducer';
function InfoBox({ title, caseType }) {
  console.log('in InfoBox');
  const { countryInfo, casesType } = useCountriesContext();
  const { dispatch } = useCountriesDispatch();
  const active = caseType === casesType;
  const total = countryInfo[caseType];
  const cases = countryInfo[`today${capitalizeFirstLetter(caseType)}`];
  const color = {
    cases: ' #CC1034',
    recovered: ' #7dd71d',
    deaths: ' #fb4443',
  };
  const handleClick = () => {
    dispatch({ type: actions.SET_CASES_TYPE, data: caseType });
  };
  return (
    <Card
      className='infoBox'
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
