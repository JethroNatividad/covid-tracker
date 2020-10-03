import React from 'react';
import numeral from 'numeral';
import './Table.css';
import { useCountriesContext } from './CountriesProvider';
function Table() {
  const { tableData } = useCountriesContext();
  return (
    <div className='table'>
      {tableData.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format('0,0')}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
