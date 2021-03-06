import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';
import { showMessage, hideMessage } from "react-native-flash-message";
import Colors from '../constants/Colors';
import config from '../../env';

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token && config.method !== 'OPTIONS') {
    config.headers.authorization = token;
  }

  return config;
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  if (error.response.status === 401) {
    await AsyncStorage.removeItem('token');
    showMessage({ message: errorMessage(error.request.responseURL), backgroundColor: Colors.primary })
    return navigate('loginFlow');
  } else {
    return Promise.reject(error);
  }
});

const errorMessage = (responseURL) => {
  if (responseURL.match(/users\/sign_in/)) {
    return 'Invalid Email or Password';
  }
  return 'Session Expired!';
}



export default axiosInstance;