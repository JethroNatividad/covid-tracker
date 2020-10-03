import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import Linegraph from './Linegraph';
import 'leaflet/dist/leaflet.css';
import { useCountriesContext } from './CountriesProvider';
import Header from './Header';
function App() {
  //CONTEXT STATE
  const { casesType } = useCountriesContext();

  const BASE_API = 'https://disease.sh/v3/covid-19';
  console.log('re render');

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
          <strong>LIVE CASES BY COUNTRY</strong>
          <Table />
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
