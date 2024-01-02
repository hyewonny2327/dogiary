import axios from 'axios';
const getUserToken = () => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = localStorage.getItem('userToken');
  return userToken;
};

export const api = axios.create({
  baseURL: 'http://kdt-sw-7-team09.elicecoding.com/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = getUserToken();

  // 토큰이 있다면 헤더에 추가한다.
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  // config.headers['Content-Type'] = 'application/json';

  return config;
});
