import axios from 'axios';
import { Loading } from 'quasar';

export const apiClient = axios.create({
  baseURL: 'https://fake.jsonmockapi.com',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  },
});

apiClient.interceptors.request.use((config) => {
  Loading.show();
  return config;
}, (error) => {
  Loading.hide();
  return Promise.reject(error);
});

apiClient.interceptors.response.use((config) => {
  Loading.hide();
  return config;
}, (error) => {
  Loading.hide();
  return Promise.reject(error);
});

export default apiClient;