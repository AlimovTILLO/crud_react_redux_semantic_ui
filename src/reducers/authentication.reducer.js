import { userConstants } from '../constants';

let profil = JSON.parse(localStorage.getItem('user'));
const initialState = profil ? { loggedIn: true, profil } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        profil: {email: action.user.email}
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: true,
        profil: {email: state.profil.email, token: action.user.token}
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}