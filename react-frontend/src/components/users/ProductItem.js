import { React, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Grid,
  Card,
  Button,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  Badge
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import EditProduct from './EditProduct';
import { DELETE_PRODUCT } from '../../requests/mutations';
import AlertUserDialog from '../../ui-utils/AlertUser';
import styles from '../../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => styles);

const ProductItem = ({ product, setNotice, refetch, user }) => {
  const [dialog, setDialog] = useState(false);
  const [message, setMessage] = useState();
  const classes = useStyles();
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: (data) => {
      refetch();
      setNotice({
        message: data.modifyProduct,
        severity: 'success'
      });
      console.log('delete res', data.deleteProduct);
      setTimeout(() => {
        setNotice({
          message: data.modifyProduct,
          severity: 'success'
        });
      }, 2000);
    },
    onError: (error) => {
      console.log('erro', error);
    }
  });

  const handleDelete = () => {
    deleteProduct({ variables: { id: product.id } });
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  };

  const handleClose = () => {
    setMessage(null);
  };

  const openDeletDialog = () => {
    if (user.roleValue) {
      setMessage(
        `This action cannot be undone '${product.title}' and all its related likes and comments will be deleted as well!`
      );
    }
  };

  const openEditDialog = () => {
    setDialog(true);
  };

  return (
    <>
      <Grid key={product.id} item xs={12} sm={12} md={6} lg={6} id="card">
        <Card className={classes.mediaRoot}>
          <CardActionArea onClick={openEditDialog}>
            <div className={classes.mediaGrid}>
              <img
                alt="artist Larryne"
                className={classes.media}
                src={product.image.url}
                width="20%"
                title={product.title}
              />

              <div className={classes.comments}>
                <Badge
                  className={classes.badge}
                  badgeContent={product.comments.length ?? 0}
                  showZero
                >
                  <CommentIcon className={classes.bagdeIcons} />
                </Badge>
                <Badge
                  className={classes.badge}
                  badgeContent={product.likes}
                  showZero
                >
                  <FavoriteIcon className={classes.bagdeIcons} />
                </Badge>
              </div>
            </div>

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.actions}>
            <Button
              size="small"
              className={classes.actionBtn}
              onClick={openEditDialog}
            >
              <EditIcon /> edit
            </Button>
            <Button
              size="small"
              className={classes.actionBtn}
              onClick={openDeletDialog}
            >
              <DeleteIcon /> delete
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <EditProduct
        dialog={dialog}
        setDialog={setDialog}
        product={product}
        refetch={refetch}
        setNotice={setNotice}
      />
      <AlertUserDialog
        title={`Are You Sure You Want to Delete Item ${product.title}?`}
        message={message}
        action={handleDelete}
        handleClose={handleClose}
        actionLable="Delete"
      />
    </>
  );
};

export default ProductItem;
