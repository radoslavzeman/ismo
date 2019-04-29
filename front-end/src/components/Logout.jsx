import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext'
import { Button } from 'react-md'

const ProtectedRoute = () => (
  <AuthConsumer>
    {(ctx) => (
      ctx.is_user ? <Button raised secondary onClick={() => ctx.logout()}>Logout</Button> : <Redirect to="/profile"/>
    )}
  </AuthConsumer>
)

export default ProtectedRoute
