import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './InfoBox.css';
function InfoBox({ title, cases, total }) {
  return (
    <Card className='infoBox'>
      <CardContent>
        {/* Title here. e.g. Coronavirus cases / Deaths */}
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>
        {/* Number of cases. e.g. +12,000 */}
        <h2 className='infoBox__cases'>+ {cases}</h2>

        {/* Total. e.g. 12M Total */}
        <Typography className='infoBox__total' color='textSecondary'>
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
