import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './helpers';
import { App }from "./App"
import ReactNotification from 'react-notifications-component'
import './App/App.css'
import 'semantic-ui-css/semantic.min.css';
import 'react-notifications-component/dist/theme.css'

render(
    <Provider store={store}>
        <ReactNotification />
        <App/>
    </Provider>,
    document.getElementById('root')
);