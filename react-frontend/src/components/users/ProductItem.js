import { React, useState } from 'react';
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
import useStyles from '../../ui-utils/globalStyles';
import EditProduct from './EditProduct';

const ProductItem = ({ product }) => {
  const [dialog, setDialog] = useState(false);
  const classes = useStyles();

  const openEditDialog = () => {
    setDialog(true)
  };
  return (
    <>
      <Grid key={product.id} item xs={12} sm={12}md={6} lg={6} id="card">
        <Card className={classes.mediaRoot}>
          <CardActionArea>
            <div className={classes.mediaGrid}>
              <img
                alt="artist Larryne"
                className={classes.media}
                src={product.image.url}
                width="20%"
                title={product.title}
              />

              <div className={classes.comments}>
                <Badge className={classes.badge} badgeContent={0} showZero>
                  <CommentIcon className={classes.bagdeIcons} />
                </Badge>
                <Badge className={classes.badge} badgeContent={0} showZero>
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
            <Button size="small" className={classes.actionBtn}>
              <DeleteIcon /> delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <EditProduct dialog={dialog} setDialog={setDialog} product={product} />
    </>
  );
};

export default ProductItem;
