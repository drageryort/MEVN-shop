import axios from "axios";

const apiUrl = `http://localhost:3000/api/`

const $api = axios.create({
  withCredentials:true,
  baseURL: apiUrl
})

$api.interceptors.request.use(config => {
  return config;
})

$api.interceptors.response.use(config => {
  return config;
}, async error => {
  const originalRequest = error.config;

  if(error.response.status === 401 && !error?.config?.once) {
    try {
      originalRequest.once = true
      await axios.get(`${apiUrl}/refresh_token`, {withCredentials: true});
      localStorage.setItem('userStatus', 'authenticated');
      return $api.request(originalRequest)
    } catch (e) {
      console.log(e)
    }
  }
  throw error
})

export {$api, apiUrl};