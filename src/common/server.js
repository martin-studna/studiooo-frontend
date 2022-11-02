import axios from 'axios';

const server = axios.create({
  // baseURL: 'https://studiooo.cz/api',
  baseURL: 'http://localhost:3000',
  // baseURL: 'https://46.101.114.1/api',
  withCredentials: true,
});

export default server;
