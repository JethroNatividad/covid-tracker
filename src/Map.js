import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { useCountriesContext } from './CountriesProvider.js';
import { showDataOnMap } from './helpers.js';
import './Map.css';
function Map() {
  console.log('in Map');
  const { mapCountries, mapCenter, mapZoom, casesType } = useCountriesContext();
  return (
    <div className='map'>
      <LeafletMap center={mapCenter} zoom={mapZoom}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(mapCountries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
