import axios from 'axios'
export const HTTP = axios.create({
  baseURL: 'https://reqres.in/'
})