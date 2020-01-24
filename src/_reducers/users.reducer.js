import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        pages: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GETBYID_REQUEST:
      return {
        user: { loading: true },
        pages: state.pages
      };
    case userConstants.GETBYID_SUCCESS:
      return {
        user: action.user.data,
        pages: state.pages
      };
    case userConstants.GETBYID_FAILURE:
      return {
        error: action.error,
        pages: state.pages
      };
    case userConstants.DELETE_REQUEST:
      return {
        ...state,
        pages: {
          page: state.pages.page, total_pages: state.pages.total_pages, data: state.pages.data.map(user =>
            user.id === action.id
              ? { ...user, deleting: true }
              : user
          )
        }
      };
    case userConstants.DELETE_SUCCESS:
      return {
        pages: { page: state.pages.page, total_pages: state.pages.total_pages, data: state.pages.data.filter(user => user.id !== action.id) }
      };
    case userConstants.DELETE_FAILURE:
      return {
        ...state,
        pages: {
          page: state.pages.page, total_pages: state.pages.total_pages, data: state.pages.data.map(user => {
            if (user.id === action.id) {
              const { deleting, ...userCopy } = user;
              return { ...userCopy, deleteError: action.error };
            }

            return user;
          })
        }
      };
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        pages: {
          ...state.pages,
          data: state.pages.data.map((user) => {
            if (user.id === action.user.id) {
              return {
                ...user,
                ...action.user
              }
            }
            return user
          })


        }
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state
      };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        pages: {
          page: state.pages.page, total_pages: state.pages.total_pages, data: state.pages.data.map(user => {
            if (user.id === action.id) {
              const { deleting, ...userCopy } = user;
              return { ...userCopy, deleteError: action.error };
            }

            return user;
          })
        }
      };
    case userConstants.CREATE_REQUEST:
      return {
        ...state,
        pages: {
          ...state.pages,
          data: [
            action.user,
            ...state.pages.data.slice(action.index)
          ]
          }

        }
    case userConstants.CREATE_SUCCESS:
      return {
        ...state
      };
    case userConstants.CREATE_FAILURE:
      return {
        ...state,
        pages: {
          page: state.pages.page, total_pages: state.pages.total_pages, data: state.pages.data.map(user => {
            if (user.id === action.id) {
              const { deleting, ...userCopy } = user;
              return { ...userCopy, deleteError: action.error };
            }

            return user;
          })
        }
      };
    default:
      return state
  }
}