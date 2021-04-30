import { React, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../../requests/mutations';

const Login = ({ setNotice, setUser }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onCompleted: (data) => {
      history.push('/');
    },
    onError: (error) => {
      setNotice({ message: error.graphQLErrors[0].message, severity: 'error' });
      console.log('erro', error.message);
    }
  });

  useEffect(() => {
    if (result.data) {
      console.log(result);
      const user = result.data.login;
      setUser(user);
      console.log('user', user.fullname);
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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            label="email"
            required
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            required
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
