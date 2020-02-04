import { connect } from 'react-redux';


import { usersActions } from './actions';
import { UsersPage } from './UsersPage';

function mapState(state) {
    const { users } = state;
    return { users };
}

const actionCreators = {
    getUsers: usersActions.getAll,
    getUser: usersActions.getById,
    deleteUser: usersActions.delete,
    updateUser: usersActions.update,
    createUser: usersActions.create
}

const connectedHomePage = connect(mapState, actionCreators)(UsersPage);
export { connectedHomePage as UsersPage };
