import { React, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Grid,
  Card,
  Button,
  CardActionArea,
  CardActions,
  CardMedia,
  Badge
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { MODIFY_PRODUCT } from '../../requests/mutations';
import DetailsDialog from '../photos/DetailsDialog';
import styles from '../../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => styles);

const Photo = ({ photo, setNotice, user, refetch }) => {
  const [likes, setLikes] = useState(photo.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [dialog, setDialog] = useState(false);
  const classes = useStyles();
  // modify pdt mutation request
  const [likePhoto] = useMutation(MODIFY_PRODUCT, {
    onCompleted: (data) => {
      setLikes(data.modifyProduct.likes);
      console.log('liked photo', data.modifyProduct);
      refetch();
      //setDialog(false);

      //window.location.reload(false);
    },
    onError: (error) => {
      console.log('erro', error);
    }
  });

  const handleLikeMutation = () => {
    if (user) {
      console.log('photoId', photo.id);
      likePhoto({
        variables: {
          id: photo.id,
          likes: !isLiked ? likes + 1 : isLiked && likes > 0 ? likes - 1 : likes
        }
      });
      isLiked ? setIsLiked(false) : setIsLiked(true);
      return;
    }
    setNotice({
      message: `login or sign up to like or comment!`,
      severity: 'info'
    });
  };

  const setDialogAndCreateComment = () => {
    setDialog(true);
    if (!user) {
      setNotice({
        message: `login or sign up to comment!`,
        severity: 'info'
      });
      return;
    }
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={4} xlg={4} id="card">
        <Card className={classes.mediaRoot}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="artist Larryne"
              className={classes.photoPageMedia}
              src={photo.image.url}
              width="90%"
              title={photo.title}
            />
          </CardActionArea>
          <CardActions className={classes.actions}>
            <Button size="small" onClick={handleLikeMutation}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
            {likes !== 0 && (
              <Badge className={classes.photoBadge} badgeContent={likes}>
                <FavoriteIcon className={classes.photoBagdeIcons} />
              </Badge>
            )}
            <Button
              size="small"
              className={classes.photoActionBtn}
              onClick={setDialogAndCreateComment}
            >
              <CommentIcon />
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <DetailsDialog
        dialog={dialog}
        setNotice={setNotice}
        setDialog={setDialog}
        user={user}
        photo={photo}
        refetch={refetch}
      />
    </>
  );
};

export default Photo;
