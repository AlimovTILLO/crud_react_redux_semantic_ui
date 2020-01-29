import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { history } from '../helpers';
import {
    Container,
    Icon,
    Menu,
    Responsive,
    Sidebar
} from 'semantic-ui-react';

const profil = JSON.parse(localStorage.getItem('user'));

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


export class MobileContainer extends Component {

    state = { sidebarOpened: false }

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleItemClick = (e, { name, url }) => {
        history.push('/' + url)
        this.setState({ activeItem: name })
    }

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened, activeItem } = this.state
        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item name='products' url='' active={activeItem === 'products'} onClick={this.handleItemClick}>Products</Menu.Item>
                    <Menu.Item name='users' url='users' active={activeItem === 'users'} onClick={this.handleItemClick}>Users</Menu.Item>
                    <Menu.Item position='right'>
                        <Link to="/login">Logout</Link>
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Container>
                        <Menu borderless
                            fixed={'top'}
                            size='large'
                        >
                            <Menu.Item onClick={this.handleToggle}>
                                <Icon name='sidebar' />
                            </Menu.Item>
                            <Menu.Item position='right'>
                                <p>{profil.email}</p>
                            </Menu.Item>
                        </Menu>
                    </Container>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}