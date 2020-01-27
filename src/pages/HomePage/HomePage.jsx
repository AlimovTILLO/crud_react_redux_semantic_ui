import React from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux';
// import { userActions } from '../../actions';
import { ResponsiveContainer } from '../../components/ResponsiveContainer'
import PropTypes from 'prop-types'


ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}



class HomePage extends React.Component {

    render() {
        return (
            <ResponsiveContainer>
                <Container style={{ margin: '3em 0em 0em', padding: '3em 0em', minHeight: 'calc(100vh - 150px)' }}>
                    <h4>All users:</h4>
                </Container>
            </ResponsiveContainer>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { profil } = authentication;
    return { profil, users };
}

const actionCreators = {
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
