import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { ERROR, SUCCESS } from '../assets/colors';

const Notification = ({ notice }) => {
  const color = notice?.severity === 'success' ? SUCCESS : ERROR;

  if (!notice?.message) return null;

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
        />
      </Snackbar>
    </div>
  );
};

export default Notification;
