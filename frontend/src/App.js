import React, { useState } from 'react'
import UserContext from './context/user-context'
// import Input from './components/Input'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Tile from './components/List'
import Item from './pages/Item'
import Cart from './pages/Cart'

function App() {
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [productsArray, setProductsArray] = useState('')
  const [productsObject, setProductsObject] = useState('')
  const [cart, setCart] = useState([])

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          input, setInput,
          search, setSearch,
          productsArray, setProductsArray,
          productsObject, setProductsObject,
          cart, setCart,
        }}
      >

        <div>
          <h2>Game Store</h2>
          <Cart />
        </div>
        <div>
          <Switch>
            <Route exact path='/'>
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

export default App
