import { Card, CardContent, Typography } from '@material-ui/core';
import { formatNumber } from './helpers';
import React from 'react';
import './InfoBox.css';
function InfoBox({ title, active, casesType, cases, total, handleClick }) {
  const color = {
    cases: ' #CC1034',
    recovered: ' #7dd71d',
    deaths: ' #fb4443',
  };
  return (
    <Card
      className='infoBox'
      style={{ borderTop: active && `10px solid ${color[casesType]}` }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>
        <h2 className='infoBox__cases' style={{ color: color[casesType] }}>
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
