import React, {  } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {
  ListItemAvatar,
  Avatar} from '@material-ui/core';
import styles from '../../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => styles);

const Profile = ({ user}) => {
  const classes = useStyles();
 
  const extractAvatar = () => {
    const name = user.fullname.toUpperCase().split(' ');
    return `${name[0][0]}${name[1][0] ?? ''}`
  }

  if (!user.roleValue) {
    return (
      <div className={classes.profile}>
        <List>
          <ListItem>
            <ListItemText
              primary="Name"
              secondary={user?.fullname}
            />

            <ListItemAvatar>
              <Avatar className={classes.profileAvatar}> {extractAvatar()}</Avatar>
            </ListItemAvatar>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Your Email"
              secondary={user.email}
            />
          </ListItem>
          <Divider />
        </List>
      </div>
    );
  }
  return null;
};

export default Profile;
