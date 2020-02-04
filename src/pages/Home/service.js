import { HTTP } from '../../services/api'

export const productService = {
    getAll
};


function getAll(data) {
      return HTTP.get(`/api/products/?page=${data.page}`).then(handleResponse);
}

function handleResponse (response) { return response.data }