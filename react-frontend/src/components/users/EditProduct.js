import React, { useState, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {
  Slide,
  TextField,
  DialogContent,
  DialogContentText,
  ListItemAvatar,
  Avatar,
  FormControl,
  Menu,
  MenuItem,
  Select,
  InputLabel
} from '@material-ui/core';
import { PRIMARY, PRIMARY_LIGHT } from '../../assets/colors';

const EditProduct = ({ dialog, product, setDialog }) => {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
      backgroundColor: PRIMARY
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    textField: {
      marginRight: '12%'
    },
    multilineText: {
      marginRight: '15%'
    },
    formControl: {
      margin: theme.spacing(4),
      minWidth: 120,
      marginLeft: '8%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setDialog(false);
  };

  if (dialog) {
    return (
      <div>
        <Dialog
          fullScreen
          scroll="paper"
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Close
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
              <ListItemText primary="Title" secondary={product.title} />
              <TextField
                className={classes.textField}
                autoFocus
                margin="dense"
                id="name"
                label="New title"
                type="text"
              />
              <ListItemAvatar>
                <Avatar src={product.image.url} />
              </ListItemAvatar>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Description"
                secondary={product.description}
              />
              <TextField
                className={classes.multilineText}
                id="filled-textarea"
                label="edit description"
                placeholder="Placeholder"
                multiline
                variant="outlined"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Category" />
              <ListItemText primary="Tag" secondary={product.tag} />

              <ListItemText primary="priority" secondary={product.priority} />
              <ListItemText
                primary="published"
                secondary={`${product.published}`}
              />
            </ListItem>

            <Divider />
            <ListItem>
              <ListItemText primary="Store Info" />
              <ListItemText
                primary="price"
                secondary={product.price ?? '---'}
              />
              <ListItemText
                primary="sold"
                secondary={product.quantitySold ?? '---'}
              />
              <ListItemText
                primary="available"
                secondary={`${product.availiable ?? '---'}`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Edit Category" />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={2}
                  onChange={() => {}}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={2}
                  onChange={() => {}}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={2}
                  onChange={() => {}}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={2}
                  onChange={() => {}}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
          <Divider />

          <ListItem>
            <TextField
              className={classes.textField}
              autoFocus
              margin="dense"
              id="name"
              label="edit price"
              type="number"
            />
          </ListItem>
        </Dialog>
      </div>
    );
  }
  return null;
};

export default EditProduct;
