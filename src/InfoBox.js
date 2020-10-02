import { Card, CardContent, Typography } from '@material-ui/core';
import { formatNumber } from './helpers';
import React from 'react';
import './InfoBox.css';
function InfoBox({ title, cases, total, handleClick }) {
  return (
    <Card className='infoBox' onClick={handleClick}>
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>
        {/* Number of cases. e.g. +12,000 */}
        <h2 className='infoBox__cases'>+ {formatNumber(cases)}</h2>

        {/* Total. e.g. 12M Total */}
        <Typography className='infoBox__total' color='textSecondary'>
          {formatNumber(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
