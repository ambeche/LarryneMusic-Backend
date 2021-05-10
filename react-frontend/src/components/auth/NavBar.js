import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import styles from '../../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => styles);

const NavBar = ({ profile, user, data, handleLogout, called }) => {
  const classes = useStyles();

  if (profile) {
    return (
      <>
        <Link className={classes.appBarLink} to="/">
          <Button className={classes.appBarLink}>LarryneMusic</Button>
        </Link>
        <Link className={classes.appBarLink} to="/store">
          <Button className={classes.appBarLink}>store</Button>
        </Link>
        {
          // only appears if user is admin
          // a combination of localstorage, useQuery hook with an authenticated user,
          // and useState are used to keep the user logged in even after refreshing the app.
          // this approuch is used because in addition to the token, users data used for role based
          // authorization was required, hence could not be saved in local storage. only the token is
          // stored in storage

          data?.user?.roleValue ? (
            <Link className={classes.appBarLink} to="/admin/unpublished-items">
              <Button className={classes.appBarLink}>
                {data?.user?.fullname ?? user?.fullname}
              </Button>
            </Link>
          ) : null
        }
        {!data?.user?.roleValue && (
          <Link style={{ padding: 10 }} to="/profile">
            <Button className={classes.appBarLink}>
              {data?.user?.fullname ?? user?.fullname}
            </Button>
          </Link>
        )}
        {
          // logs out the user and redirect to the home page
          data && called && (
            <Link className={classes.appBarLink} to="/">
              <Button className={classes.appBarLink} onClick={handleLogout}>
                Log out
              </Button>
            </Link>
          )
        }
        {
          // hidden upon successfull login
          !user && !data && (
            <Link className={classes.appBarLink} to="/login">
              <Button className={classes.appBarLink}>login</Button>
            </Link>
          )
        }
      </>
    );
  }

  return (
    <>
      <Link className={classes.appBarLink} to="/">
        <Button className={classes.appBarLink}>LarryneMusic</Button>
      </Link>
      <Link className={classes.appBarLink} to="/store">
        <Button className={classes.appBarLink}>store</Button>
      </Link>
      {
        // hidden upon successfull login
        !user && !data && (
          <Link className={classes.appBarLink} to="/login">
            <Button className={classes.appBarLink}>login</Button>
          </Link>
        )
      }
    </>
  );
};

export default NavBar;
