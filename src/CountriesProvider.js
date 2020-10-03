import React, { createContext, useContext, useReducer } from 'react';
import { stateReducer, initialState } from './reducer';

const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <CountriesContext.Provider value={{ ...state, dispatch: dispatch }}>
      {children}
    </CountriesContext.Provider>
  );
};
export const useCountriesContext = () => useContext(CountriesContext);
