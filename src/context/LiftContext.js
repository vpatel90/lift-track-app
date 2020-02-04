import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { showMessage, hideMessage } from "react-native-flash-message";
import { navigate } from '../navigationRef';
import Colors from '../constants/Colors';

const liftReducer = (state, action) => {
  switch (action.type){
    case 'get_lifts':
      return { ...state, lifts: action.payload }
    case 'get_tags':
      return { ...state, tags: action.payload }
    case 'get_lift_dates':
      return { ...state, liftDates: action.payload }
    case 'get_daily_summary':
      return { ...state, dailySummary: action.payload }
    case 'add_lift':
      return { ...state, lifts: [...state.lifts, action.payload] }
    default:
      return state;
  }
};

const getLiftDates = dispatch => async () => {
  try {
    const response = await trackerApi.get(`/api/v1/lift_dates`);
    dispatch({ type: 'get_lift_dates', payload: response.data });
  } catch (err) {
    console.log(err);
  }
}

const getDailySummary = dispatch => async({date}) => {
  try {
    const response = await trackerApi.get(`/api/v1/lift_dates/${date}`);
    dispatch({ type: 'get_daily_summary', payload: response.data });
  } catch (err) {
    console.log(err);
  }
}

const getTags = dispatch => async () => {
  try {
    const response = await trackerApi.get('/api/v1/tags');
    dispatch({ type: 'get_tags', payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

const getLifts = dispatch => async () => {
  try {
    const response = await trackerApi.get('/api/v1/lifts');
    dispatch({ type: 'get_lifts', payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

const createLift = dispatch => async ({ name }) => {
  try {
    const response = await trackerApi.post('/api/v1/lifts', { lift: { name }});
    showMessage({ message: 'Exercise Created', type: 'success' });
    dispatch({ type: 'add_lift', payload: response.data });
    navigate('Home')
  } catch (err) {
    console.log(err);
  }
}

export const { Provider, Context } = createDataContext(
  liftReducer,
  { getLifts, getTags, getLiftDates, getDailySummary, createLift },
  { lifts: [], tags: [], liftDates: [], dailySummary: [] }
);