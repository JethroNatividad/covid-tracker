import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import './App.css';
import { actions } from './reducer';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import Linegraph from './Linegraph';
import 'leaflet/dist/leaflet.css';
import { useCountriesContext } from './CountriesProvider';
import Header from './Header';
function App() {
  //CONTEXT STATE
  const {
    dispatch,
    countryInfo,
    tableData,
    mapCountries,
    mapCenter,
    mapZoom,
    casesType,
  } = useCountriesContext();

  const BASE_API = 'https://disease.sh/v3/covid-19';
  console.log('re render');

  return (
    <div className='app'>
      <div className='app__left'>
        <Header />

        <div className='app__stats'>
          <InfoBox
            casesType='cases'
            active={casesType === 'cases'}
            handleClick={() =>
              dispatch({ type: actions.SET_CASES_TYPE, data: 'cases' })
            }
            title='Coronavirus cases'
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <InfoBox
            casesType='recovered'
            active={casesType === 'recovered'}
            handleClick={() =>
              dispatch({ type: actions.SET_CASES_TYPE, data: 'recovered' })
            }
            title='Recovered'
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox
            casesType='deaths'
            active={casesType === 'deaths'}
            handleClick={() =>
              dispatch({ type: actions.SET_CASES_TYPE, data: 'deaths' })
            }
            title='Deaths'
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <Map
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>
      <Card className='app__right'>
        <CardContent>
          <strong>LIVE CASES BY COUNTRY</strong>
          <Table data={tableData} />
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
