export const initialState = {
  countries: [],
  country: 'worldwide',
  countryInfo: {},
  tableData: [],
  mapCountries: [],
  mapCenter: {
    lat: 34.80746,
    lng: -40.4796,
  },
  mapZoom: 2,
  casesType: 'cases',
};

export const actions = {
  SET_COUNTRIES: 'SET_COUNTRIES',
  SET_COUNTRY: 'SET_COUNTRY',
  SET_COUNTRY_INFO: 'SET_COUNTRY_INFO',
  SET_TABLE_DATA: 'SET_TABLE_DATA',
  SET_MAP_COUNTRIES: 'SET_MAP_COUNTRIES',
  SET_MAP_CENTER: 'SET_MAP_CENTER',
  SET_MAP_ZOOM: 'SET_MAP_ZOOM',
  SET_CASES_TYPE: 'SET_CASES_TYPE',
};

export const stateReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actions.SET_COUNTRIES:
      return { ...state, countries: action.data };
    case actions.SET_COUNTRY:
      return { ...state, country: action.data };
    case actions.SET_COUNTRY_INFO:
      return { ...state, countryInfo: action.data };
    case actions.SET_TABLE_DATA:
      return { ...state, tableData: action.data };
    case actions.SET_MAP_COUNTRIES:
      return { ...state, mapCountries: action.data };
    case actions.SET_MAP_CENTER:
      return { ...state, mapCenter: action.data };
    case actions.SET_MAP_ZOOM:
      return { ...state, mapZoom: action.data };
    case actions.SET_CASES_TYPE:
      return { ...state, casesType: action.data };
    default:
      return state;
  }
};
