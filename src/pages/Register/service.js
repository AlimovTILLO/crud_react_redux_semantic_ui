import { HTTP } from '../../services'

export const registerService = {
    register,
};


function register(user) {

    return HTTP.post('/api/register', user)
        .then(handleResponse);
}


function handleResponse(response) { return response.data }
