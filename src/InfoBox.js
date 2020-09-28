import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './InfoBox.css';
function InfoBox({ title, cases, total }) {
  return (
    <Card className='infoBox'>
      <CardContent>
        {/* Title here. e.g. Coronavirus cases / Deaths */}
        <Typography></Typography>
        {/* Number of cases. e.g. +12,000 */}
        <Typography></Typography>
        {/* Total. e.g. 12M Total */}
        <Typography></Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
