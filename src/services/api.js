import axios from 'axios'
export const baseURL = 'http://search.intuit.kg/'
export const HTTP = axios.create({
  baseURL: baseURL
})