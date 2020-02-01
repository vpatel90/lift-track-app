import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';
import { showMessage, hideMessage } from "react-native-flash-message";
import Colors from '../constants/Colors';

const axiosInstance = axios.create({
  baseURL: 'https://0432c64e.ngrok.io',
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
    showMessage({ message: 'Session Expired!', backgroundColor: Colors.primary })
    return navigate('loginFlow');
  } else {
    return Promise.reject(error);
  }
})

export default axiosInstance;