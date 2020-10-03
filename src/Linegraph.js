import React from 'react';
import './Linegraph.css';
import { Line } from 'react-chartjs-2';
import options from './linegraphOptions';
import { useCountriesContext } from './CountriesProvider';

function Linegraph() {
  const { linegraphData } = useCountriesContext();
  return (
    <div className='linegraph'>
      <Line
        options={options}
        data={{
          datasets: [
            {
              data: linegraphData,
              backgroundColor: 'rgba(204, 16, 52, 0.5)',
              borderColor: '#cc1034',
            },
          ],
        }}
      />
    </div>
  );
}

export default Linegraph;
