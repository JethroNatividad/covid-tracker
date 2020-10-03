import React from 'react';
import numeral from 'numeral';
import { useCountriesContext } from './CountriesProvider';
import './Table.css';
function Table() {
  //context data
  const { tableData } = useCountriesContext();
  return (
    <>
      <strong>LIVE CASES BY COUNTRY</strong>
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
    </>
  );
}

export default Table;
