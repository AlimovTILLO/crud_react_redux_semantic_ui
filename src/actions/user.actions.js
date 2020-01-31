import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error('Incorrect email or password'));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function create(user, page) {
    return async dispatch => {
        dispatch(request(user));
        try {
            const { async } = await userService.create(user)
            dispatch(success(user));
            dispatch(getAll( page ))
            dispatch(alertActions.success('User successful created'));
            console.log('async', async)

        } catch ({ response }) {
            dispatch(failure(response.data.email[0]));
            dispatch(alertActions.error(response.data.email[0]));
        }
    };

    function request(user) { return { type: userConstants.CREATE_REQUEST, user } }
    function success(user) { return { type: userConstants.CREATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CREATE_FAILURE, error } }
}

function getAll(page) {
    return dispatch => {
        dispatch(request());

        userService.getAll(page)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(user) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}

function update(user) {
    return dispatch => {
        dispatch(request(user));
        userService.update(user, user.id)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('User edited successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}


function _delete(data) {
    console.log(JSON.stringify(data) + 'asssssssssssssssssssssssssssssss')
    return dispatch => {
        dispatch(request(data.id));


        userService.delete(data.id)
            .then(
                user => {
                    dispatch(success(data.id));
                    dispatch(getAll(data.page))
                    dispatch(alertActions.success('User deleted successfully'));
                },
                error => dispatch(failure(data.id, error.toString()))
            );


    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}