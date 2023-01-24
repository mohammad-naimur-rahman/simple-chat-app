import Cookies from 'js-cookie'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      exact
      {...rest}
      render={({ location }) =>
        Cookies.get('token') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
