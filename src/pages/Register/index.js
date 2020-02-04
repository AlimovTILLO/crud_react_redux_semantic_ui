import { connect } from 'react-redux';


import { RegisterPage } from './RegisterPage';
import { registerActions } from './actions';

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: registerActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };