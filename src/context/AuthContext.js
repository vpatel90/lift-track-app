import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type){
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'add_token':
      return { ...state, token: action.payload, errorMessage: '' };
    case 'remove_token':
      return { ...state, token: null };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'add_token', payload: token });
    navigate('mainFlow');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/users', { user: { email, password }});
    await AsyncStorage.setItem('token', response.headers.authorization);
    dispatch({ type: 'add_token', payload: response.headers.authorization });
    navigate('mainFlow');
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong' });
  }
};


const login = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/users/sign_in', { user: { email, password }});
    await AsyncStorage.setItem('token', response.headers.authorization);
    dispatch({ type: 'add_token', payload: response.headers.authorization });
    console.log(response.headers.authorization)
    navigate('mainFlow');
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong' });
  }
};

const logout = dispatch => async () => {
  try {
    await trackerApi.delete('/users/sign_out');
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'remove_token' });
    navigate('loginFlow');
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong' });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, login, logout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
)