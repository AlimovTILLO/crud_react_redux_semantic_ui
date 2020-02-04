
import { connect } from 'react-redux';

import { HomePage } from './HomePage';
import { productActions } from './actions';


function mapState(state) {
    const { products, loading } = state;
    return { products, loading };
}

const actionCreators = {
    getProducts: productActions.getAll
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export { connectedHomePage as HomePage };
