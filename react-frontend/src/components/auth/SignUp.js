import { React, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { LOGIN, REGISTER_USER } from '../../requests/mutations';
import styles from '../../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => styles);

const SignUp = ({ setNotice, setNewUser, setShowLogin }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const [register] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      setNewUser(data.registerUser);
      setShowLogin(true);
      setNotice({
        message: 'Account created successfully, login to access your account!',
        severity: 'success'
      });
      history.push('/login');
    },
    onError: (error) => {
      setNotice({
        message: error?.graphQLErrors[0]?.message,
        severity: 'error'
      });
      console.log('erro', error.message);
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();
    register({ variables: { userInput: { email, password, fullname } } });
    setEmail('');
    setPassword('');
    setFullname('');
  };

  return (
    <>
      <h2>Register</h2>
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
          <TextField
            label="full name"
            type="text"
            autoComplete="name"
            required
            onChange={({ target }) => setFullname(target.value)}
          />
        </div>
        <div>
          <Button
            className={classes.loginBtn}
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </Button>
        </div>
      </form>
      <div>
            Already have an account?
            <Button
              className={classes.registerBtn}
              onClick={() => setShowLogin(true)}
            >
              Login
            </Button>
          </div>
    </>
  );
};

export default SignUp;
