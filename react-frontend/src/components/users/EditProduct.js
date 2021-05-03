import React, { useState, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
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
  ListItemAvatar,
  Avatar,
  FormControl,
  MenuItem,
  Select,
  InputLabel
} from '@material-ui/core';
import useStyles from '../../ui-utils/globalStyles';
import { MODIFY_PRODUCT } from '../../requests/mutations';
import { PRODUCTS } from '../../requests/queries';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditProduct = ({ dialog, product, setDialog, setNotice }) => {
  const [tag, setTag] = useState('');
  const [priority, setPriority] = useState(2);
  const [available, setAvailable] = useState(true);
  const [published, setPublished] = useState(true);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [deliveryType, setDeliveryType] = useState('');
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  // modify pdt mutation request
  const [edit] = useMutation(MODIFY_PRODUCT, {
    onCompleted: (data) => {
      console.log('edited pdt', data.modifyProduct);
      setDialog(false);
      setNotice({
        message: `Item "${data.modifyProduct.title}" was successfully updated`,
        severity: 'success'
      });
      history.push('/admin/unpublished-items');
      window.location.reload(false);
    },
    onError: (error) => {
      setNotice({
        message: error?.graphQLErrors[0]?.message,
        severity: 'error'
      });
      console.log('erro', error);
    },
    // update apollo client cache
    update: (store, response) => {
      try{const dataInStore = store.readQuery({ query: PRODUCTS })
      store.writeQuery({
        query: PRODUCTS,
        data: {
          ...dataInStore,
          products: [ ...dataInStore.products, response.data.modifyProduct ]
        }
      })} catch (e) {
        console.log('cache update error', e.message);
        
      }
    }
  });

  const handleClose = () => {
    setDialog(false);
  };

  const handleUpdate = (pdt) => {
    edit({
      variables: {
        id: pdt.id,
        storeInfo: {
          price,
          available,
          deliveryType
        },
        published,
        description,
        title,
        tag,
        priority
      }
    });
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
          <AppBar className={classes.appBarEditDialog}>
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
              <Button
                autoFocus
                color="inherit"
                onClick={() => handleUpdate(product)}
              >
                Post Item
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
              <ListItemText
                primary="Title"
                secondary={title ? title : product.title}
              />
              <TextField
                className={classes.textField}
                autoFocus
                margin="dense"
                id="name"
                label="New title"
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
              <ListItemAvatar>
                <Avatar src={product.image.url} />
              </ListItemAvatar>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Description"
                secondary={description ? description : product.description}
              />
              <TextField
                className={classes.multilineText}
                id="filled-textarea"
                label="edit description"
                placeholder="Placeholder"
                multiline
                variant="outlined"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Category" />
              <ListItemText primary="Tag" secondary={tag ? tag : product.tag} />

              <ListItemText
                primary="priority"
                secondary={
                  priority || priority === 0 ? priority : product.priority
                }
              />
              <ListItemText
                primary="published"
                secondary={`${published ? published : product.published}`}
              />
              <ListItemText
                primary="Likes"
                secondary={`${product.likes ?? '---'}`}
              />
            </ListItem>

            <Divider />
            <ListItem>
              <ListItemText primary="Store Info" />
              <ListItemText
                primary="price"
                secondary={price ? price : product.storeInfo.price}
              />
              <ListItemText
                primary="sold"
                secondary={product.storeInfo.quantitySold}
              />
              <ListItemText
                primary="available"
                secondary={`${
                  available ? available : product.storeInfo.available
                }`}
              />
              <ListItemText
                primary="delivery type"
                secondary={`${
                  deliveryType ? deliveryType : product.storeInfo.deliveryType
                }`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Edit" />
              <FormControl className={classes.formControl}>
                <InputLabel id="product-tag">Tag</InputLabel>
                <Select
                  labelId="product-tag"
                  id="product-tag"
                  required
                  value={tag}
                  onChange={({ target }) => setTag(target.value)}
                >
                  <MenuItem value="photo">photo</MenuItem>
                  <MenuItem value="store">store</MenuItem>
                  <MenuItem value="video">video</MenuItem>
                  <MenuItem value="music">music</MenuItem>
                  <MenuItem value="logo">logo</MenuItem>
                  <MenuItem value="profile">profile</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="priority">priority</InputLabel>
                <Select
                  labelId="priority"
                  id="priority"
                  value={priority}
                  onChange={({ target }) => setPriority(target.value)}
                >
                  <MenuItem value={0}>zero</MenuItem>
                  <MenuItem value={1}>one</MenuItem>
                  <MenuItem value={2}>two</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="published">Published</InputLabel>
                <Select
                  labelId="published"
                  id="published"
                  required
                  value={published}
                  onChange={({ target }) => setPublished(target.value)}
                >
                  <MenuItem value={true}>true</MenuItem>
                  <MenuItem value={false}>false</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="avialable">Available</InputLabel>
                <Select
                  labelId="available"
                  id="available"
                  value={available}
                  onChange={({ target }) => setAvailable(target.value)}
                >
                  <MenuItem value={true}>true</MenuItem>
                  <MenuItem value={false}>false</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="delivery-method">delivery method</InputLabel>
                <Select
                  labelId="delivery-method"
                  id="delivery-method"
                  value={deliveryType}
                  onChange={({ target }) => setDeliveryType(target.value)}
                >
                  <MenuItem value="download">download</MenuItem>
                  <MenuItem value="shipping">shipping</MenuItem>
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
              value={price}
              onChange={({ target }) => setPrice(target.value)}
            />
          </ListItem>
        </Dialog>
      </div>
    );
  }
  return null;
};

export default EditProduct;
