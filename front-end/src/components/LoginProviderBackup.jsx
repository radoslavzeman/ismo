import React, { PureComponent } from "react";
// import { AuthConsumer } from './AuthContext'
import {
    Button,
    CardActions,
    SelectionControl,
    SelectionControlGroup,
    Snackbar,
    TextField
} from 'react-md';
import { isNull } from "util";

const AuthContext = React.createContext()

class Login extends PureComponent {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            user_name: "",
            password: "",
            user: null
        };
    }

    login = (event) => {
        event.preventDefault();

        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_name: this.state.user_name, password: this.state.password })
        }).then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json()
        }).then(data => {
            if (data.msg === "user_not_exists") {
                // notify.show("Zadané prihlasovacie meno neexistuje", "error", 4000);
                console.log("Zadané prihlasovacie meno neexistuje");
            }
            if (data.msg === "multiple_users_with_same_user_name") {
                console.log("Z nejakého dôvodu existuje viacero užívateľov s týmto prihlasovacím menom");
                // throw new Error("Fatal Error: Multiple users with same username");
            }
            if (data.msg === "wrong_password") {
                console.log("Zadané heslo nie je správne");
            }
            if (data.msg === "err") {
                throw data.error;
            }

            // Log in user
            if (data.msg === "ok") {
                console.log('User ' + data.user.user_name + ' is successfully logged in');
                this.setState({ user: data.user });

            }
        })
            .catch(err => console.log("Error while fetching persons: " + err))
    }

    logout = () => {
        this.setState({ user: null })
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

        return (

            <div className="Login">
                <AuthContext.Provider
                    value={{
                        user: this.state.isAuth,
                        login: this.login,
                        logout: this.logout
                    }}
                >
                    {this.props.children}
                </AuthContext.Provider>
                
                <form className="md-grid text-fields__application" onSubmit={this.login.bind(this)}>
                    <TextField
                        id="user_name"
                        label="User name"
                        className="md-cell md-cell--12"
                        value={this.state.user_name}
                        // defaultValue={this.state.user_name}
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
                        // defaultValue={this.state.password}
                        onChange={value => this.setState({ password: value })}
                        required
                    />
                    <CardActions className="md-cell md-cell--12">
                        <Button
                            raised
                            primary
                            type="submit"
                            className="md-cell--center"
                            disabled={!this.validateForm()}
                        >
                            Log in
                        </Button>
                    </CardActions>
                </form>
            </div>
        );
    }
}


const AuthConsumer = AuthContext.Consumer

export { Login, AuthConsumer }
