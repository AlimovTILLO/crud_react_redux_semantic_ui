import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import PropTypes from 'prop-types'
import { store } from 'react-notifications-component';

import { history } from '../helpers';
import { PrivateRoute } from '../components';
import { HomePage } from '../pages/Home';
import { LoginPage } from '../pages/Login';
import { RegisterPage } from '../pages/Register';
import { UsersPage } from '../pages/Users'

export class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
                <div>
                    {alert.message && store.addNotification({
                        title: `${alert.type}`,
                        message: `${alert.message}`,
                        type: `${alert.type}`,
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000,
                            onScreen: true
                        }
                    })
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <PrivateRoute exact path="/users" component={UsersPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
        );
    }
}

UsersPage.propTypes = {
    alert: PropTypes.object,
}