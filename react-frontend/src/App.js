import { React, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { useApolloClient, useQuery } from '@apollo/client';
import Store from './components/store/Store';
import Login from './components/auth/Login';
import AdminPanel from './components/users/AdminPanel';
import Profile from './components/users/Profile'
import Notification from './ui-utils/Notification';
import ProgressBar from './ui-utils/ProgressBar';
import { USER } from './requests/queries';
import NavBar from './components/auth/NavBar';
import PhotoAlbum from './components/photos/PhotoAlbum';
import styles from './ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => styles);

const App = () => {
  const [skip, setSkip] = useState(false);
  const { data, loading, called } = useQuery(USER, { skip });

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [notice, setNotice] = useState({ message: null, severity: null });
  const [products, setProducts] = useState(null);
  const client = useApolloClient();
  const classes = useStyles();

  useEffect(() => {
    // skips the authenticated user query request when user is logged out
    if (!loading && !data) setSkip(true);
  }, [loading, data]);

  console.log('loggedIn', data);

  useEffect(() => {
    setProfile(true);
  }, [profile, user, loading]);

  const notify = (message) => {
    setNotice(message);
    setTimeout(() => {
      setNotice(null);
    }, 8000);
  };

  const handleLogout = () => {
    setSkip(true);
    // logs out user and clear users data from both the
    // local storage and apollo client cache
    setUser(null);
    localStorage.clear();
    client.resetStore();
  };

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <Container>
      <div className={classes.appBar}>
        <NavBar
          data={data}
          loading={loading}
          called={called}
          profile={profile}
          handleLogout={handleLogout}
        />
      </div>

      <Switch>
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
        <Route path="/profile">
          <Profile user={data?.user}/>
        </Route>
        <Route path="/login">
          <Login setUser={setUser} setNotice={notify} setProfile={setProfile} />
        </Route>
        <Route path="/">
          <PhotoAlbum setNotice={notify} user={data?.user} />
        </Route>
      </Switch>
      <Notification notice={notice} />
      <div className={classes.footer}>
        <br />
        <em>LarryneMusic</em>
      </div>
    </Container>
  );
};

export default App;
