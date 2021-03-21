import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_BASE_URL
})

export default ({ Vue }) => {
  Vue.prototype.$axios = instance
}

instance.interceptors.response.use(
  response => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      location.reload()
    }
    return Promise.reject(error.response)
  })

export { instance }
