import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';
export const sortData = (data) => {
  return data.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
export const buildChartData = (data, type) => {
  //need to return {x: date, y: new number of cases in that date}
  //to get the new number of cases, subtract it with the previous Data
  //06/01/20 : 6279950 and 06/02/20: 6401009 = 121059 cases in that date
  const chartData = [];
  let previousDataPoint;
  for (let date in data[type]) {
    if (previousDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[type][date] - previousDataPoint,
      };
      chartData.push(newDataPoint);
    }
    previousDataPoint = data[type][date];
  }
  return chartData;
};
//color
const casesTypeColor = {
  cases: {
    hex: '#CC1034',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000,
  },
};

//simple formatter
export const formatNumber = (number) =>
  numeral(number).format('0,0a').toUpperCase();

//this generates all the Circles on the map
export const showDataOnMap = (data, type) =>
  data.map((country) => (
    <Circle
      //this is where the circle is located
      center={[country.countryInfo.lat, country.countryInfo.long]}
      //opacity of the circle
      fillOpacity={0.4}
      //border color based on the case type
      color={casesTypeColor[type].hex}
      //background color of the circle based on the case type
      fillColor={casesTypeColor[type].hex}
      //radius of the circle, square root of the cases * the multiplier
      radius={Math.sqrt(country[type]) * casesTypeColor[type].multiplier}
    >
      {/* data displayed when clicking the circle */}
      <Popup>
        <div className='info-container'>
          <div
            className='info-flag'
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className='info-name'>{country.country}</div>
          <div className='info-confirmed'>
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className='info-recovered'>
            Recovered: {numeral(country.recovered).format('0,0')}{' '}
          </div>
          <div className='info-deaths'>
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
//to capitalize first letter of string
export const capitalizeFirstLetter = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
