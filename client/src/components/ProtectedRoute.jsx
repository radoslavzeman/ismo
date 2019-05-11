import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext'
import _ from 'lodash'
import { useCookies } from 'react-cookie'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // <AuthConsumer>
  //   {(ctx) => (
  //     ctx.is_user ? <Route render={props =><Component {...props} />}{...rest}/> : <Redirect to="/login"/>
  //   )}
  // </AuthConsumer>
  const [cookies, setCookie] = useCookies(['name']);
  
  return (!_.isEmpty(cookies.user) ? <Route render={props =><Component {...props} />}{...rest}/> : <Redirect to="/login"/>);

}

export default ProtectedRoute
