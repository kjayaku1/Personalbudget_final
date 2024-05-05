import axios from 'axios';
import Logout from '../utils/logout';

const httpClient = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});

const onSuccess = (response) => Promise.resolve(response);
const onError = async ({ response }) => {
  const { data } = response || {};
  const { message } = data;
  if (message === 'Token has expired' || message === 'You must be logged in' || response.status === 422) {
    // localStorage.clear()
    // window.location.reload();
    Logout();
    // console.log(data)
  }
  return Promise.reject(response)
};

httpClient.interceptors.request.use((req) => {
  if (req.url === '/refresh/token') {
    req.headers['Authorization'] = `Bearer ${localStorage.getItem('refreshToken')}`
  } else {
    req.headers['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`
  }
  return req
}
);
httpClient.interceptors.response.use(onSuccess, onError);

export default httpClient;
