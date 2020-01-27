import { HTTP } from './api'
// import { authHeader } from '../helpers';

export const productService = {
    getAll
};


function getAll(data) {
      return HTTP.get(`/api/unknown?page=${data.page}&per_page=${data.per_page}`).then(handleResponse);
}


function handleResponse (response) {
    const data = response.data
    if (data.errors === true) {
      if (response.status === 401) {
        // eslint-disable-next-line no-restricted-globals
        location.reload(true)
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    } else {
      return response.data
    }
  }