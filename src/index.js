import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStats from './Components/UserStats';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';

const initialState = {
    clockStatus: {
        isTicking: false,
        sessionsCompleted: []
    }}

const store = createStore(
    reducer, 
    initialState,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Route path='/' exact component={App} />
            <Route path='/myStats' component={UserStats} />
        </Provider>
    </Router>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
