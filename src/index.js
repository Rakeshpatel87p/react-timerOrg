import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TimerTaskApp from './Components/TimerTaskApp';
import UserStats from './Components/UserStats';
import LoginPrompt from './Components/Login/LoginPrompt';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './Reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as serviceWorker from './serviceWorker';

const store = createStore(
    reducer, 
    applyMiddleware(logger,thunk)
);

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Route path='/' exact component={TimerTaskApp} />
            <Route path='/myStats' component={UserStats} />
            <Route path='/login' component={LoginPrompt} />
        </Provider>
    </Router>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
