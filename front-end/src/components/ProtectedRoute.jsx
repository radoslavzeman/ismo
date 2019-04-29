import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {(ctx) => (
      ctx.is_user ? <Route render={props =><Component {...props} />}{...rest}/> : <Redirect to="/login"/>
    )}
  </AuthConsumer>
)

export default ProtectedRoute
