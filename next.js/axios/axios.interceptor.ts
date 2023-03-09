
import axios from 'axios'

const Axios = axios.create({
    baseURL:"http://localhost:4000"
})

Axios.interceptors.request.use(config => {
    const token = localStorage.getItem('seneren');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
export default Axios;