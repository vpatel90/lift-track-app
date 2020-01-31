import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { navigate } from '../navigationRef';
import Colors from '../constants/Colors';

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
    showMessage({ message: 'Logged In Automatically', backgroundColor: Colors.primary });
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
    showMessage({ message: 'Account Created!', type: 'success' });
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong' });
  }
};


const login = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/users/sign_in', { user: { email, password }});
    await AsyncStorage.setItem('token', response.headers.authorization);
    dispatch({ type: 'add_token', payload: response.headers.authorization + 'av' });
    navigate('mainFlow');
    showMessage({ message: 'Logged In!', backgroundColor: Colors.primary });
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
    showMessage({ message: 'Logged Out', backgroundColor: Colors.primary});
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong' });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, login, logout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
)