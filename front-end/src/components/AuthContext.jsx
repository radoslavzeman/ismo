import React from 'react'

const AuthContext = React.createContext()

class AuthProvider extends React.Component {
    state = {
        is_user: true,                            // Mock login
        user: {                                      // Mock user data
            id: 0,
            name: 'R',
            surname: 'Z',
            date_of_birth: "1100-01-01",
            gender: 'M',
            address: 'Ulica 3',
            city: 'Bratislava',
            zip: '83107',
            phone: '+421901123456',
            email: 'mail@mail.com',
            unit: null,
            user_name: 'radoze',
            user_state: 2,
            user_created: null
        },
        toggle_login: (user) => {
            const set_to = !this.state.is_user;
            this.setState({ 
                is_user: set_to,
                id: user.id,
                name: user.name,
                surname: user.surname,
                date_of_birth: user.date_of_birth,
                gender: user.gender,
                address: user.address,
                city: user.city,
                zip: user.zip,
                phone: user.phone,
                email: user.email,
                unit: user.unit,
                user_name: user.user_name,
                user_state: user.user_state,
                user_created: user.user_created
            });

        }
    };

//   constructor() {
//     super()

//     this.login = this.login.bind(this)
//     this.logout = this.logout.bind(this)
//   }

//   login(user) {
//     this.setState({ user: user });
//   }

//   logout() {
//     this.setState({ user: null })
//   }

  render() {
    return (
      <AuthContext.Provider
        value={{
            is_user: this.state.is_user,
            user: this.state.user,
            toggle_login: this.state.toggle_login
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
