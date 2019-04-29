import React, { PureComponent } from "react";
import { Button, CardActions, SelectionControl, SelectionControlGroup, Snackbar, TextField, CardText } from 'react-md';
import { AuthProvider, AuthConsumer } from './AuthContext'

class Login extends PureComponent {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            user_name: "",
            password: "",
        };
    }

    login = (ctx) => {
        // event.preventDefault();

        console.log("LOGIN:");
        console.log(this.state);

        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_name: this.state.user_name, password: this.state.password })
        }).then(response => {
            console.log(response);
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(data => {
            if (data.msg === "user_not_exists") {
                console.log("Zadané prihlasovacie meno neexistuje");
            }
            if (data.msg === "multiple_users_with_same_user_name") {
                console.log("Z nejakého dôvodu existuje viacero užívateľov s týmto prihlasovacím menom");
            }
            if (data.msg === "wrong_password") {
                console.log("Zadané heslo nie je správne");
            }
            if (data.msg === "err") {
                console.log("Undefined error while login")
                throw data.error;
            }
            if (data.msg === "ok") {
                // console.log(data.user);
                // console.log('User ' + data.user.user_name + ' is successfully logged in');
                // ctx.toggleLogin(data.user);
                console.log("ok");
            }
        })
            .catch(err => console.log("Error while fetching user: " + err))

    }

    validateForm() {
        // if (/^[a-zA-Z]/.test(this.state.user_name)) {
        // return false;
        // }
        // else {
        return this.state.user_name.length > 0 && this.state.password.length > 0;
        // }
    }

    render() {
        // console.log(this.state);

        return (
            <div className="Login md-box-shadow">
            <AuthConsumer>
            { (ctx) => {
                if (!ctx.is_user) {
                    return (
                        <form className="md-grid text-fields__application" onSubmit={() => ctx.login({name: "Fake", surname: "News"})}>
                        {/* <form className="md-grid text-fields__application" onSubmit={() => ctx.toggle_login()}> */}
                            <TextField
                                id="user_name"
                                label="User name"
                                className="md-cell md-cell--12"
                                value={this.state.user_name}
                                onChange={value => this.setState({ user_name: value })}
                                // errorText="asdfasdf"
                                required
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                className="md-cell md-cell--12"
                                value={this.state.password}
                                onChange={value => this.setState({ password: value })}
                                required
                            />
                            <CardActions className="md-cell md-cell--12">
                                <Button
                                    raised
                                    primary
                                    type="submit"
                                    className="md-cell--center"
                                    // disabled={!this.validateForm()}
                                >
                                    Log in
                                </Button>
                            </CardActions>
                        </form>
                    );
                }
                else {
                    return (
                        <Button raised secondary onClick={() => ctx.logout()}>Logout</Button>
                    );
                }
            }}
            </AuthConsumer>
            </div>
        );
    }
}

export default Login