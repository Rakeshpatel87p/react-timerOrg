import React, { Component } from 'react';

export class LoginPrompt extends Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <input type="text" placeholder="Username"></input>
                <input type="text" placeholder="Password"></input>
                <button>Login</button>
                <button>Create an Account</button>
            </div>
        );
    }
}

export default LoginPrompt;
