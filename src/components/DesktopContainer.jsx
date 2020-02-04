import React, { Component } from 'react'
import { node, object } from 'prop-types'
import { Link } from 'react-router-dom';
import { history } from '../helpers';
import {
    Container,
    Menu,
    Responsive
} from 'semantic-ui-react';
import { connect } from 'react-redux';

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


class DesktopContainer extends Component {
    static propTypes = {
        children: node,
        profil: object,
    }
    state = {}

    handleItemClick = (e, { name, url }) => {
        history.push('/' + url)
        this.setState({ activeItem: name })
    }

    render() {
        const { children, profil } = this.props
        const { activeItem } = this.state
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Menu
                    borderless
                    fixed='top'
                    size='large'
                >
                    <Container>
                        <Menu.Item
                            name='products'
                            url=''
                            active={activeItem === 'products'}
                            onClick={this.handleItemClick}>Products</Menu.Item>
                        <Menu.Item
                            name='users'
                            url='users'
                            active={activeItem === 'users'}
                            onClick={this.handleItemClick}>Users</Menu.Item>
                        <Menu.Item position='right'>
                            <Menu.Item position='right'>{profil.user.email}</Menu.Item>
                            <Link to="/login">Logout</Link>
                        </Menu.Item>
                    </Container>
                </Menu>

                {children}
            </Responsive>
        )
    }
}

function mapState(state) {
    const { authentication } = state;
    const { profil } = authentication;
    return { profil };
}

const connectedDesktopContainer = connect(mapState)(DesktopContainer);
export { connectedDesktopContainer as DesktopContainer };