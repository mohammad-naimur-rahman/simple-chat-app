import { Route, Switch } from 'react-router-dom'
import './App.css'
import ChatPage from './pages/ChatPage'
import Homepage from './pages/Homepage'

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Homepage} />
      <Route path='/chats' component={ChatPage} />
    </Switch>
  )
}

export default App
