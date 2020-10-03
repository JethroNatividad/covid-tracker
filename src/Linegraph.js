import React from 'react';
import options from './linegraphOptions';
import { Line } from 'react-chartjs-2';
import { useCountriesContext } from './CountriesProvider';
import './Linegraph.css';

function Linegraph() {
  //context data
  const { linegraphData, casesType } = useCountriesContext();
  return (
    <>
      <strong>WORLDWIDE NEW {casesType.toUpperCase()}</strong>
      <div className='linegraph'>
        {/* the linegrapgh accepts options and data */}
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
    </>
  );
}

export default Linegraph;
