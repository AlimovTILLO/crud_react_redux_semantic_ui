import { productConstants } from '../constants';
import { productService } from '../services';

export const productActions = {
    getAll,
};

function getAll(data) {
    
    return dispatch => {
        dispatch(request());

        productService.getAll(data)
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}
