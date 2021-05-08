import React from 'react';
import {useHistory} from 'react-router-dom';
import { Snackbar, SnackbarContent, Button } from '@material-ui/core';
import { ERROR, PRIMARY_DARK, SUCCESS } from '../assets/colors';

const Notification = ({ notice }) => {
  const history = useHistory();
  const color = notice?.severity === 'success' ? SUCCESS : 'info' ? PRIMARY_DARK : ERROR;

  if (!notice?.message) return null;

  const action = (
    <Button color="secondary" size="small" onClick={() => history.push('/login')}>
      Login/Sign up
    </Button>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        
        open={true}
        message={notice?.message}
      >
        <SnackbarContent
          style={{
            backgroundColor: color
          }}
          message={<span id="client-snackbar">{notice?.message}</span>}
         action={ notice?.severity === 'info' ? action : null}
        />
      </Snackbar>
    </div>
  );
};

export default Notification;
