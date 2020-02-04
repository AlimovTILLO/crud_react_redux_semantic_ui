import { HTTP } from '../../services'

export const loginService = {
    login,
    logout,
};

function login(email, password) {
    let config = { email: email, password: password }

    return HTTP.post('/api/login/', config)
        .then(handleResponse)
        .then(user => {
            const profil = JSON.stringify(user)
            localStorage.setItem('user', profil);
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}


function handleResponse(response) { return response.data }
