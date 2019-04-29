import React from 'react'

const AuthContext = React.createContext()

class AuthProvider extends React.Component {

  constructor() {
    super();
    this.state = {
        is_user: false,                               // Mock login
        user: {                                      // Mock user data
            id: 0,
            name: 'R',
            surname: 'Z',
            // date_of_birth: "1100-01-01",
            // gender: 'M',
            // address: 'Ulica 3',
            // city: 'Bratislava',
            // zip: '83107',
            // phone: '+421901123456',
            // email: 'mail@mail.com',
            // unit: null,
            // user_name: 'radoze',
            // user_state: 2,
            // user_created: null
        },
    };
    this.login.bind(this);
    this.logout.bind(this);
  }

    login = (user) => {
      console.log("logging in");
      this.setState({ 
          is_user: true,
          user: user,
      });
    }

    logout = () => {
      console.log("logging out");
      this.setState({
        is_user: false,
        user: {},
      })
    }

  render() {
    return (
      <AuthContext.Provider
        value={{
            is_user: this.state.is_user,
            user: this.state.user,
            login: this.login,
            logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
