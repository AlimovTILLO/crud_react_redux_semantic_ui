import { userConstants } from '../../constants';
import { usersService } from './service';
import { alertActions } from '../../actions/alert.actions';

export const usersActions = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


function create(user, page) {
    return async dispatch => {
        dispatch(request(user));
        try {
            await usersService.create(user)
            dispatch(success(user));
            dispatch(getAll( page ))
            dispatch(alertActions.success('User successful created'));

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

        usersService.getAll(page)
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

        usersService.getById(id)
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
        usersService.update(user, user.id)
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
    return dispatch => {
        dispatch(request(data.id));


        usersService.delete(data.id)
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