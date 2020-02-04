import Axios from 'axios';

import { HTTP, baseURL } from '../../services/api'

export const usersService = {
    getAll,
    getById,
    update,
    create,
    delete: _delete
};


function getAll(page) {

    return HTTP.get(`/api/users/?page=${page}`)
        .then(handleResponse);
}

function getById(id) {

    return HTTP.get(`/api/users/${id}`)
        .then(handleResponse);
}

function create(user) {
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    if (user.avatar !== null && user.avatar !== undefined) {
        formData.append('avatar', user.avatar);
    }

    return Axios({
        url: baseURL + 'api/users/',
        method: 'POST',
        headers: {
            'content-type': 'multipart/form-data'
        },
        data: formData,
    }).then(handleResponse);
}

function update(user, id) {
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    if (user.avatar !== null && user.avatar !== undefined) {
        formData.append('avatar', user.avatar);
    }

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return HTTP.put(`/api/users/${id}/`, formData, config)
        .then(handleResponse);
}

function _delete(id) {
    return HTTP.delete(`/api/users/${id}/`)
        .then(handleResponse);
}


function handleResponse(response) { return response.data }
