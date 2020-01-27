import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Footer } from './Footer'
import {
    Container,
    Icon,
    Menu,
    Responsive,
    Sidebar
} from 'semantic-ui-react';


const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


class DesktopContainer extends Component {

    render() {
        const { children } = this.props

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Menu
                    borderless
                    fixed='top'
                    size='large'
                >
                    <Container>
                        <Menu.Item position='right' active><Link to="/">Products</Link></Menu.Item>
                        <Menu.Item position='left'><Link to="/users">Users</Link></Menu.Item>
                        <Menu.Item position='right'>
                        <Menu.Item position='right'>aasas@asdasd.as</Menu.Item>
                            <Link to="/login">Logout</Link>
                        </Menu.Item>
                    </Container>
                </Menu>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {

    state = { sidebarOpened: false }

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state
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
                    <Menu.Item active><Link to="/">Products</Link></Menu.Item>
                    <Menu.Item ><Link to="/users">Users</Link></Menu.Item>
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
                                <p>aasas@asdasd.as</p>
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

export const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
        <Footer>{children}</Footer>
    </div>
)


