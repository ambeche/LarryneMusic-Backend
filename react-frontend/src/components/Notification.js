import React from 'react';
import {Snackbar} from '@material-ui/core';
import {ERROR, SUCCESS} from '../assets/colors';

const Notification = ({message, severity}) => {
  const color = severity === 'success' ? SUCCESS : ERROR;

  if (!message) return null;

  return (
    <div>
    <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    bodyStyle={{ backgroundColor: {color} }}
    open={true}
    message={message}
  />
    </div>
  )
}

export default Notification;