import { useState, useEffect} from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Feed from './pages/Feed'
import Home from './pages/Home'
import './App.css'
import { CheckSession } from './services/Auth'
import NewOrderPage from './pages/NewOrderPage/NewOrderPage'
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage'

const App = () => {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    //If a token exists, sends token to localStorage to persist logged in user
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  return (
    <div className="App">
      <Nav
        user={user}
        handleLogOut={handleLogOut}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed user={user}/>} />
          <Route path="/orders/new" element={<NewOrderPage user={user}/>} />
          <Route path="/orders" element={<OrderHistoryPage user={user}/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
