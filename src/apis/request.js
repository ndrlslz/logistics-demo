import axios from 'axios'
import Store from '@/store'

const config = {
  baseURL: '/logistics-demo-api/api',
}
const request = axios.create(config)

request.interceptors.request.use(config => {
  const token = Store.state.token.token
  return {
    ...config,
    headers: Object.assign(
      {},
      config.headers,
      { Authorization: `Bearer ${token}` },
    ),
  }
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export default request
