import 'react-md/dist/react-md.light_blue-deep_orange.min.css'
import 'react-md/dist/react-md.min.js'
import React, { PureComponent } from 'react';
import { DialogContainer, NavigationDrawer, SVGIcon, FontIcon, ListItem } from 'react-md';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";

import inboxListItems from './constants/navItems';

import Persons from './components/Persons'
import Login from "./components/Login";
import Profile from "./components/Profile";
import Person from "./components/Profile";
import PersonProfile from "./components/PersonProfile"
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './components/AuthContext';

// import { Login } from './components/AuthContext'


class App extends PureComponent {
  constructor() {
    super();

    // Update the items so they have an onClick handler to change the current page
    this.navItems = inboxListItems.map((item) => {
      if (item.divider) {
        return item;
      }

      return {
        ...item,
        onClick: () => this.setPage(item.key, item.primaryText),
      };
    });

    this.state = {
      user: [],
      renderNode: null,
      visible: true,
      key: inboxListItems[0].key,
      page: inboxListItems[0].primaryText,
    };
  }

  setPage = (key, page) => {
    this.navItems = this.navItems.map((item) => {
      if (item.divider) {
        return item;
      }

      return { ...item, active: item.key === key };
    });

    this.setState({ key, page });
  };

  handleShow = () => {
    this.setState({ renderNode: document.getElementById('navigation-drawer') });
  };

  render() {
    const childProps = {
      user: this.state.user,
      // userHasAuthenticated: this.userHasAuthenticated
    };
    const { visible, page, renderNode, key } = this.state;
    return (

        <AuthProvider>
        <Router>
            <NavigationDrawer
              renderNode={renderNode}
              navItems={this.navItems.map(item =>
                <Route path={item.key} children={({ match }) => (
                  <ListItem active={!!match} component={Link} to={item.key} {...item} />
                )} />
              )}
              mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
              tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
              desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
              toolbarTitle={page}
              contentId="main-demo-content"
              temporaryIcon={<FontIcon>menu</FontIcon>}
              persistentIcon={<FontIcon>arrow_back</FontIcon>}
              contentClassName="md-grid"
            >
              <section className="md-text-container md-cell md-cell--12">
                <Switch>
                  <Route path="/persons" exact component={Persons} />
                  <Route path="/users" component={Person} />
                  <Route path="/login" component={Login} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/add-person" exact component={PersonProfile} />
                  <Route path="/persons/:id" component={PersonProfile} />

                </Switch>
              </section>
            </NavigationDrawer>
        </Router>
        </AuthProvider>
    );
  }
}

// class App extends Component {

//   state = {
//     persons: [],
//     // user: {
//     //   name: 'Jocelin',
//     //   sobrenome: 'Maria',
//     //   email: 'teuguedes@outlook.com'
//     // }
//   }

//   componentDidMount(){
//     this.getPersons()
//   }

//   getPersons = _ => {
//     fetch('http://localhost:4000/persons')
//     // .then(response => console.log(response))
//     .then(response => response.json())
//     // .then(response => console.log(response))
//     .then(response => this.setState({ persons: response}))
//     .catch(err => console.log("My err: "+err))
//   }

//   // renderUser = ({ user_id, nome, sobrenome, email}) => <div key={user_id}>{nome} | {sobrenome} | {email}</div>

//   // addUser = _ => {
//   //   const { usuario } = this.state
//   //   fetch(`http://localhost:4000/user/add?nome=${usuario.nome}&sobrenome=${usuario.sobrenome}&email=${usuario.email}`)
//   //   .then(this.getUsuarios)
//   //   .catch( err => console.log(err))
//   // }

//   render() {
//     const { persons } = this.state
//     return (
//       <div className="App">
//         {console.log(persons)}
//         {/* <div>
//           <input
//             value={usuario.nome}
//             onChange={e => this.setState({ usuario: {...usuario, nome:e.target.value}})} />
//             <input
//             value={usuario.sobrenome}
//             onChange={e => this.setState({ usuario: {...usuario, sobrenome:e.target.value}})} />
//             <input
//             value={usuario.email}
//             onChange={e => this.setState({ usuario: {...usuario, email:e.target.value}})} />
//             <button onClick={this.addUser}> Novo Usuário</button>
//         </div> */}
//                 <div className="buttons__group">
//         <h5>Theme Examples</h5>
//         <Button raised>Hello, World!</Button>
//         <Button raised primary iconClassName="fa fa-hand-spock-o">Spock</Button>
//         <Button raised secondary iconBefore={false} iconClassName="fa fa-hand-paper-o">
//           Paper
//         </Button>
//         <h5>Disabled Examples</h5>
//         <Button raised disabled>Disabled Button</Button>
//         <Button raised disabled iconChildren="close">Disabled Button</Button>
//         <h5>Theme Swapped Examples</h5>
//         <Button raised primary swapTheming>Hello</Button>
//         <Button raised secondary swapTheming>World</Button>
//       </div>
//       </div>

//     );
//   }
// }

export default App;
