import React from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import Linegraph from './Linegraph';
import Header from './Header';
import { Card, CardContent } from '@material-ui/core';
import './App.css';
import 'leaflet/dist/leaflet.css';
function App() {
  console.log('in App');
  return (
    <div className='app'>
      <div className='app__left'>
        <Header />
        <div className='app__stats'>
          <InfoBox caseType='cases' title='Coronavirus cases' />
          <InfoBox caseType='recovered' title='Recovered' />
          <InfoBox caseType='deaths' title='Deaths' />
        </div>
        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          <Table />
          <div className='app__graph'>
            <Linegraph />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
