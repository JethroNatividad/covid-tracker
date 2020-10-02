import React, { useEffect, useState } from 'react';
import './Linegraph.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { buildChartData } from './helpers';
import options from './linegraphOptions';

function Linegraph({ BASE_API, casesType = 'cases' }) {
  const [data, setData] = useState();
  useEffect(() => {
    const FetchData = async () => {
      const response = await axios.get(
        `${BASE_API}/historical/all?lastdays=120`
      );
      const chartData = buildChartData(response.data, casesType);
      setData(chartData);
    };
    FetchData();
  }, [casesType]);

  return (
    <div className='linegraph'>
      <Line
        options={options}
        data={{
          datasets: [
            {
              data: data,
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
