import { React, useState } from 'react';
import { useQuery } from '@apollo/client';
import UploadFiles from './UploadFiles';
import {
  Grid,
  Card,
  Button,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Badge,
  Container
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { makeStyles } from '@material-ui/core/styles';
import { ACCENT, ACCENT_TWO, PRIMARY } from '../../assets/colors';
import { PRODUCTS } from '../../requests/queries';
import ProgressBar from '../../ui-utils/ProgressBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '15%'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  media: {
    maxHeight: 200,
    marginLeft: '4%',
    marginTop: '4%'
  },
  mediaRoot: {},
  upload: {
    position: 'fixed',
    right: '2%',
    top: '4%',
    color: ACCENT
  },
  actions: {
    textAlign: 'center',
    justifyContent: 'center'
  },
  comments: {
    marginRight: '5%',
    marginTop: '35%'
  },
  cardImg: {
    marginLeft: '5%',
    marginTop: '3%'
  },
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'center',

    height: 160
  },
  badge: {
    color: ACCENT,
    padding: 8,
    alignContent: 'center'
  },
  bagdeIcons: {
    color: PRIMARY
  },
  actionBtn: {
    color: ACCENT_TWO
  },
  btnEdit: {
    color: ACCENT_TWO
  }
}));

const AdminPanel = ({ user, token, setNotice, products, setProducts }) => {
  const result = useQuery(PRODUCTS, {
    variables: { filter: { key: 'published', value: false } }
  });

  const classes = useStyles();
  console.log('tobe', result);

  if ((user || token) && user?.role === user?.roleValue) {
    if (result.loading) return <ProgressBar />;
    return (
      <div>
        <div className={classes.upload}>
          <UploadFiles setNotice={setNotice} setProducts={setProducts} />
        </div>
        <div className={classes.root}>
          <Grid
            container
            spacing={1}
            justify="space-evenly"
            alignItems="center"
            alignContent="center"
          >
            {result?.data?.products?.map((pdt) => (
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
                        <Badge
                          className={classes.badge}
                          badgeContent={0}
                          showZero
                        >
                          <CommentIcon className={classes.bagdeIcons} />
                        </Badge>
                        <Badge
                          className={classes.badge}
                          badgeContent={0}
                          showZero
                        >
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
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except AntarcticaLizards are a widespread group of
                        squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
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
      </div>
    );
  }

  return null;
};

export default AdminPanel;
