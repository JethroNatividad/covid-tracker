import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { useCountriesContext } from './CountriesProvider.js';
import { showDataOnMap } from './helpers.js';
import './Map.css';
function Map() {
  //context
  const { mapCountries, mapCenter, mapZoom, casesType } = useCountriesContext();
  return (
    <div className='map'>
      {/* LeafMap accepts center and zoom, center accepts lat and lng, zoom accepts number */}
      <LeafletMap center={mapCenter} zoom={mapZoom}>
        {/* These attributes are given, copied from the docs */}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* this is generates the circles, the mapcountries is the data response on request ${api_url}/all */}
        {/* casesType allow to change if viewing cases, deaths and recovered */}
        {showDataOnMap(mapCountries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
