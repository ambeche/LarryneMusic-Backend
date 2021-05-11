import { React, useState } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

const Comment = ({ comment }) => {
  console.log('comment c', comment)
  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            primary={comment?.content}
            secondary={comment?.author.fullname}
          />
        </ListItem>
      </List>
    </>
  );
};

export default Comment;
