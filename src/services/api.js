import axios from 'axios'
export const baseURL = 'http://127.0.0.1:8000/'
export const HTTP = axios.create({
  baseURL: baseURL
})