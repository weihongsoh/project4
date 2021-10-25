import React, { useState } from 'react'
import UserContext from './context/user-context'
import { BrowserRouter, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import List from './components/List'
import Item from './pages/Item'
import Cart from './pages/Cart'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [productsArray, setProductsArray] = useState('')
  const [productsObject, setProductsObject] = useState('')
  const [cart, setCart] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [editName, setEditName] = useState('')
  const [editImage, setEditImage] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [auth, setAuth] = useState(false)
  const [role, setRole] = useState(0)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState({})

  const history = useHistory()

  const handleLogout = () => {
    setAuth(false)
    setRole(0)
    setUser(null)
    setToken({})

    window.location.href = './'
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          input, setInput,
          search, setSearch,
          productsArray, setProductsArray,
          productsObject, setProductsObject,
          cart, setCart,
          name, setName,
          email, setEmail,
          password, setPassword,
          verifyPassword, setVerifyPassword,
          editName, setEditName,
          editImage, setEditImage,
          editPrice, setEditPrice,
          editDescription, setEditDescription,
          role, setRole,
          auth, setAuth,
          user, setUser,
          token, setToken,
        }}
      >
        <div>
          <div className={(auth ? 'container-fluid bg' : 'container-fluid')} >
            <div className='row'>
              <div className='col' style={{ textAlign: 'center', color: (auth ? 'red' : 'black') }}>
                <h2>Game Store</h2>
              </div>

              {auth ?
                <div className='col' style={{ textAlign: 'end' }}>
                  <button type='button' className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
                </div>
                : ''}

            </div>

            {auth ?
              <div>
                <img width='900' src='https://assets.nintendo.com/image/upload/c_fill,f_auto,h_520,q_auto,w_1440/Holiday%20Gift%20Guide/2021/Pages/headers/1366x493_homepage_hero' />
              </div>
              : ''}

            <div className='row'>
              <div className='col'>
                <Switch>
                  <Route exact path='/'>
                    <Signup />
                  </Route>
                  <Route exact path='/login'>
                    <Login style={{ textAlign: 'center' }} />
                  </Route>
                  <PrivateRoute auth={auth} exact path='/shop'>
                    <List />
                  </PrivateRoute>
                  <PrivateRoute auth={auth} exact path='/:item'>
                    <Item />
                  </PrivateRoute>
                </Switch>
              </div>
              <div className='col'>

                {auth ?
                  <div>
                    <Cart />
                  </div>
                  : ''}

              </div>
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (
          auth
            ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location }
                }}
              />
            ))
      }
    />
  );
}

export default App
