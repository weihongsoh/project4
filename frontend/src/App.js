import React, { useState } from 'react'
import UserContext from './context/user-context'
// import Input from './components/Input'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Tile from './components/List'
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
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [role, setRole] = useState(0)
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState({})

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
          role, setRole,
          auth, setAuth,
          user, setUser,
          token, setToken,
        }}
      >

        <div>
          <h2>Game Store</h2>
          <Switch>
            <Route exact path='/'>
              <Signup />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/cart'>
              <Cart />
            </Route>
            <Route exact path='/shop'>
              <Tile />
            </Route>
            <Route exact path='/:item'>
              <Item />
            </Route>
          </Switch>
        </div>

      </UserContext.Provider>
    </BrowserRouter>
  );
}

function PrivateRoute({ auth, Component, path, location, ...rest }) {
  //if auth is true then show Route else redirect to login
  return (
    <>
      {auth ? (
        <Route path={path}>
          <Component {...rest} />
        </Route>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      )}
    </>
  );
}


export default App
