import axios from 'axios'

const api = axios.create({
  baseURL: 'http://172.31.241.34:3333'
})

export default api