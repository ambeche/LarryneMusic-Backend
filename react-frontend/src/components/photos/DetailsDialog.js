import React, { useState, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Slide, TextField, Grid } from '@material-ui/core';

import { CREATE_COMMENT } from '../../requests/mutations';
import Comment from './Comment';
import styles from '../../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => styles);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailsDialog = ({
  dialog,
  photo,
  user,
  setDialog,
  setNotice,
  refetch
}) => {
  console.log('photo', photo);

  const [content, setContent] = useState('');
  const [comment, setComment] = useState();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: (data) => {
      setComment(data.createComment);
      console.log('comment', data.createComment);
      refetch();
    },
    onError: (error) => {
      console.log('erro', error);
    }
  });

  const handleClose = () => {
    setDialog(false);
  };

  const handleComment = () => {
    if (content !== '' && user) {
      createComment({
        variables: { content, commentedItem: { commentedProductId: photo.id } }
      });
      setContent('');
      return;
    }
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
          className={classes.commentDialogRoot}
        >
          <AppBar className={classes.photoDialogAppBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                className={classes.commentDialog}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Grid
            container
            spacing={1}
            justify="space-evenly"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={12} sm={12} md={6} lg={6} id="photo">
              <div className={classes.photoDetialsPic}>
                <img width="90%" alt={photo.title} src={photo.image.url} />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} id="comments">
              <Typography className={classes.photoDescription}>
                {photo.description}
              </Typography>
              {photo?.comments?.map((cmt) => (
                <Comment key={cmt.id} comment={cmt} />
              ))}
              <TextField
                className={classes.multilineText}
                id="filled-textarea"
                label="comment on photo"
                placeholder="Placeholder"
                multiline
                variant="outlined"
                disabled={!user}
                value={content}
                onChange={({ target }) => setContent(target.value)}
              />
              {content !== '' && user && (
                <Button onClick={handleComment} className={classes.actionBtn}>
                  Post Comment
                </Button>
              )}
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
  return null;
};

export default DetailsDialog;
