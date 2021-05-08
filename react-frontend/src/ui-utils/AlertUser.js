import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from '../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => styles);

const AlertUserDialog = ({title, message, actionLable, action, handleClose}) => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  if (!message) return null

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-alert-dialog"
        aria-describedby="user-alert-dialog"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus className={classes.actionBtn}>
            Cancel
          </Button>
          <Button onClick={action} className={classes.actionBtn}>
           {actionLable}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertUserDialog;