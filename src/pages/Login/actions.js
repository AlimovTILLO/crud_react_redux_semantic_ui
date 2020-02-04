import { userConstants } from '../../constants';
import { loginService } from './service';
import { alertActions } from '../../actions';
import { history } from '../../helpers';

export const loginActions = {
    login,
    logout,
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        loginService.login(email, password)
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
    loginService.logout();
    return { type: userConstants.LOGOUT };
}
