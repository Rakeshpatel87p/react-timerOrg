import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class LoginBar extends Component {
    render() {
        return (
            <div>
                <Link to={'/login'} style={{display: 'none'}}>Login</Link>
            </div>
        );
    }
}

export default LoginBar;
