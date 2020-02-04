
import { connect } from 'react-redux';

import { LoginPage } from './LoginPage';
import { loginActions } from './actions';


function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: loginActions.login,
    logout: loginActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };