import React from 'react';
import {
  Switch, Route, Link
} from "react-router-dom"

import {  useQuery } from '@apollo/client';
import {PRODUCTS} from './requests/queries';
import Photos from './components/photos/Photos';
import Store from './components/store/Store';
import Login from './components/auth/Login';
import Home from './components/home/Home';


const App = () => {
  const result = useQuery(PRODUCTS);

  if (result.loading)  {
    return <div>loading...</div>
  }
  console.log(result.data.products);
  const padding = {padding: 10}
  return (
    <div>

        <div>
          <Link style={padding} to="/">LarryneMusic</Link>
          <Link style={padding} to="/photos">Photos</Link>
          <Link style={padding} to="/store">Store</Link>
          <Link style={padding} to="/login">Login</Link>
        </div>

        <Switch>
          <Route path="/photos">
            <Photos />
          </Route>
          <Route path="/store">
            <Store/>
          </Route>
          <Route path="/login">
            <Login  />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      
      <div>
        <br />
        <em>LarryneMusic</em>
      </div>
    </div>
  )
}

export default App
//{result.data.products.map(p => <img alt='' src={p.image.url} width='400'/>)}