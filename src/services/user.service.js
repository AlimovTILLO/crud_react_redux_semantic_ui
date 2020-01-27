import { HTTP } from './api'
// import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    create,
    delete: _delete
};

function login(email, password) {
    let config = { email: email, password: password }

    return HTTP.post('/api/login/', config)
        .then(handleResponse)
        .then(user => {
            const profil = JSON.stringify({email: email, token: user.token})
            localStorage.setItem('user', profil);
            return user;
        });
}

function logout() {
    
    localStorage.removeItem('user');
}

function getAll(data) {

    return HTTP.get(`/api/users?page=${data.page}&per_page=${data.per_page}`).then(handleResponse);
}

function getById(id) {

    return HTTP.get(`/api/users/${id}`)
    .then(handleResponse);
}

function register(user) {

    return HTTP.post('/api/register', user)
    .then(handleResponse);
}
function create(user) {

    return HTTP.post('/api/users', user)
    .then(handleResponse);
}

function update(user, id) {

    return HTTP.put(`/api/users/${id}`, user)
    .then(handleResponse);
}

function _delete(id) {

    return HTTP.delete(`/api/users/${id}`)
    .then(handleResponse);
}

function handleResponse (response) {
    const data = response.data
    if (data.errors === true) {
      if (response.status === 401) {
        logout()
        // eslint-disable-next-line no-restricted-globals
        location.reload(true)
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    } else {
      return response.data
    }
  }