import { Route, Switch } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import ChatPage from './pages/ChatPage'
import Homepage from './pages/Homepage'

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' exact>
          <Homepage />
        </Route>
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
      </Switch>
    </div>
  )
}

export default App
