import React, { Component } from 'react';
import * as firebase from 'firebase';

export class LoginPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createAccount: true,
            email: null,
            password: null
        }
    }

    toggleRegisterUser = () => {
        this.setState({
            createAccount: true
        })
    }

    registerUser = () => {
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch((e) => {
                console.log(e)
            })
    }

    render() {
        return (
            <div>
                {this.state.createAccount ? 
                    (
                    <div>
                        <h1>Create New Account</h1>
                        <form onSubmit={this.registerUser}>
                            <input type="text" placeholder="Enter Email" onChange={(e) => this.setState({email: e.target.value})}></input>
                            <input type="text" placeholder="Enter Password" onChange={(e) => this.setState({password: e.target.value})}></input>
                            <button onClick={this.registerUser}>Create an Account</button>
                        </form>
                    </div>
                    )
                    :
                    (
                    <div>
                        <h1>Login</h1> 
                        <form>
                            <input type="text" placeholder="Username"></input>
                            <input type="text" placeholder="Password"></input>
                            <button>Login</button>
                            <button onClick={this.toggleRegisterUser}>Create an Account</button>
                        </form>
                    </div>
                    )
                    
                }

            </div>
        );
    }
}

export default LoginPrompt;
