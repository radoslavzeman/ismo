import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext'
import { Button } from 'react-md'


class Logout extends React.PureComponent {

  logout = () => {
    this.props.cookies.remove('user', { path: "/" });
    // console.log(this.props.cookies);
    this.props.history.push("/");
  }
  
  render () { 
    return (
      <Button raised secondary onClick={() => this.logout()}>Logout</Button>
    )}
};

export default Logout
