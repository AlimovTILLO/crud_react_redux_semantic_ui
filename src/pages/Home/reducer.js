import { productConstants } from '../../constants';

export function products(state = {}, action) {
  switch (action.type) {
    case productConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case productConstants.GETALL_SUCCESS:
      return {
        loading: true,
        pages: action.products
      };
    case productConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}