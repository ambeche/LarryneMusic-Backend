import { React, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../../requests/mutations';
import styles from '../../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';
import SignUp from './SignUp';

const useStyles = makeStyles(() => styles);

const Login = ({ setNotice, setUser, setProfile }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const classes = useStyles();

  const [login, result] = useMutation(LOGIN, {
    onCompleted: (data) => {
      if (data.login.roleValue) {
        history.push('/admin/unpublished-items');
        window.location.reload(false);
      }
      history.push('/');
      window.location.reload(false);
    },
    onError: (error) => {
      setNotice({
        message: error?.graphQLErrors[0]?.message,
        severity: 'error'
      });
      console.log('erro', error.message);
    }
  });

  useEffect(() => {
    if (result.data) {
      console.log(result);
      const user = result.data.login;
      setUser(user);
      setProfile(true);
      console.log('user', user.fullname);
      // persist user's token to localstorage
      localStorage.setItem('user-token', user.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const onSubmit = (event) => {
    event.preventDefault();
    login({ variables: { email, password } });
    setEmail('');
    setPassword('');
  };

  const toggleLoginForm = () => {
    if (showLogin) {
      return (
        <>
          <h2>Login</h2>
          <form onSubmit={onSubmit}>
            <div>
              <TextField
                label="email"
                type="email"
                autoComplete="current-email"
                required
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div>
              <TextField
                label="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div>
              <Button
                className={classes.loginBtn}
                variant="contained"
                color="primary"
                type="submit"
              >
                login
              </Button>
            </div>
          </form>
          <div>
            Don't have an account?
            <Button
              className={classes.registerBtn}
              onClick={() => setShowLogin(false)}
            >
              Register
            </Button>
          </div>
        </>
      );
    }
    return (
      <SignUp
        setNotice={setNotice}
        setNewUser={setNewUser}
        setShowLogin={setShowLogin}
      />
    );
  };

  return <div className={classes.login}>{toggleLoginForm()}</div>;
};

export default Login;
