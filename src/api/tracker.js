import axios from 'axios';

export default axios.create({
  baseURL: 'https://0432c64e.ngrok.io',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});