import { React } from 'react';
import {
  Grid,
  Card,
  Button,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  Badge} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import useStyles from '../../ui-utils/globalStyles'

const ProductList = ({ products }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={1}
        justify="space-evenly"
        alignItems="center"
        alignContent="center"
      >
        {products?.map((pdt) => (
          <Grid key={pdt.id} item xs={6} id="card">
            <Card className={classes.mediaRoot}>
              <CardActionArea>
                <div className={classes.mediaGrid}>
                  <img
                    alt="artist Larryne"
                    className={classes.media}
                    src={pdt.image.url}
                    width="20%"
                    title={pdt.title}
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
                    {pdt.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    AntarcticaLizards are a widespread group of squamate
                    reptiles, with over 6,000 species, ranging across all
                    continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.actions}>
                <Button size="small" className={classes.actionBtn}>
                  <EditIcon /> edit
                </Button>
                <Button size="small" className={classes.actionBtn}>
                  <DeleteIcon /> delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
