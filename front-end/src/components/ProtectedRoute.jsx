import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ user }) => (
      <Route
        render={props =>
          user ? <Component {...props} /> : <Redirect to="/login" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute
