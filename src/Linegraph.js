import React, { useEffect, useState } from 'react';
import './Linegraph.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
function Linegraph({ BASE_API }) {
  const [data, setData] = useState();
  useEffect(() => {
    const FetchData = async () => {
      const response = await axios.get(
        `${BASE_API}/historical/all?lastdays=120`
      );
    };
  }, []);
  return (
    <div className='linegraph'>
      <Line data options />
    </div>
  );
}

export default Linegraph;
