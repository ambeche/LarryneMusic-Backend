import { React, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';

import { useApolloClient, useQuery } from '@apollo/client';
import { PRODUCTS } from './requests/queries';
import Photos from './components/photos/Photos';
import Store from './components/store/Store';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import AdminPanel from './components/users/AdminPanel';
import Notification from './ui-utils/Notification';
import { USER } from './requests/queries';
import LinkProfile from './components/auth/LinkProfile';

const App = () => {
  const [skip, setSkip] = useState(false);
  const { data, loading, called } = useQuery(USER, { skip });

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [notice, setNotice] = useState({ message: null, severity: null });
  const [products, setProducts] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    // skips the authenticated user query request when user is logged out
    if (!loading && !data) setSkip(true);
  }, [loading, data]);

  console.log('loggedIn', data);

  const notify = (message) => {
    setNotice(message);
    setTimeout(() => {
      setNotice(null);
    }, 8000);
  };

  
    setTimeout(() => {
      if(loading || !data?.user.roleValue ) setProfile(true);
    }, 1000);
  

  const handleLogout = () => {
    setSkip(true);
    // logs out user and clear users data from both the
    // local storage and apollo client cache
    setUser(null);
    localStorage.clear();
    client.resetStore();
  };

  if (false) {
    return <div>loading...</div>;
  }

  const padding = { padding: 10 };
  return (
    <Container>
      <div>
        <Link style={padding} to="/">
          LarryneMusic
        </Link>
        <Link style={padding} to="/photos">
          Photos
        </Link>
        <Link style={padding} to="/store">
          Store
        </Link>

        {
          // only appears if user is admin
          // a combination of localstorage, useQuery hook with an authenticated user,
          // and useState are used to keep the user logged in even after refreshing the app.
          // this approuch is used because in addition to the token, users data used for role based
          // authorization was required, hence could not be saved in local storage. only the token is
          // stored in storage

          user?.roleValue || data?.user?.roleValue ? (
            <Link style={padding} to="/admin">
              {data?.user?.fullname ?? user?.fullname}
            </Link>
          ) : null
        }
        {
         <LinkProfile profile={profile} user={user} data={data} />
         }
        {
          // logs out the user and redirect to the home page
          (user || data) && called && (
            <Link style={padding} to="/">
              <Button onClick={handleLogout} color="primary">
                Log out
              </Button>
            </Link>
          )
        }
        {
          // hidden upon successfull login
          !user && !data && (
            <Link style={padding} to="/login">
              Login
            </Link>
          )
        }
      </div>

      <Switch>
        <Route path="/photos">
          <Photos />
        </Route>
        <Route path="/store">
          <Store />
        </Route>
        <Route path="/admin">
          <AdminPanel
            user={data?.user}
            token={user}
            setNotice={notify}
            products={products}
            setProducts={setProducts}
          />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} setNotice={notify} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Notification notice={notice} />
      <div>
        <br />
        <em>LarryneMusic</em>
      </div>
    </Container>
  );
};

export default App;
//{result.data.products.map(p => <img alt='' src={p.image.url} width='400'/>)}
