import React from 'react';
import numeral from 'numeral';
import './Table.css';
import { useCountriesContext } from './CountriesProvider';
function Table() {
  console.log('in Table');
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
