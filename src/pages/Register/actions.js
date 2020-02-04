import { userConstants } from '../../constants';
import { registerService } from './service';
import { alertActions } from '../../actions';
import { history } from '../../helpers';

export const registerActions = {
    register,
};


function register(user) {
    return dispatch => {
        dispatch(request(user));

        registerService.register(user)
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
