import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import _ from 'lodash'
import { useCookies } from 'react-cookie'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [cookies, setCookie] = useCookies(['name']);
  
  return (!_.isEmpty(cookies.user) ? <Route render={props =><Component {...props} />}{...rest}/> : <Redirect to="/login"/>);

}

export default ProtectedRoute
