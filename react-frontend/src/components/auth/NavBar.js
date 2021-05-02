import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const NavBar = ({ profile, user, data, handleLogout, called }) => {
  const padding = { padding: 10 };
  if (profile) {
    return (
      <>
        <Link style={padding} to="/">
          LarryneMusic
        </Link>
        <Link style={padding} to="/photos">
          Photos
        </Link>
        <Link style={padding} to="/store">
          Store
        </Link>
        {
          // only appears if user is admin
          // a combination of localstorage, useQuery hook with an authenticated user,
          // and useState are used to keep the user logged in even after refreshing the app.
          // this approuch is used because in addition to the token, users data used for role based
          // authorization was required, hence could not be saved in local storage. only the token is
          // stored in storage

          data?.user?.roleValue ? (
            <Link style={padding} to="/admin">
              {data?.user?.fullname ?? user?.fullname}
            </Link>
          ) : null
        }
        {!data?.user?.roleValue && (
          <Link style={{ padding: 10 }} to="/profile">
            {data?.user?.fullname ?? user?.fullname}
          </Link>
        )}
        {
          // logs out the user and redirect to the home page
          data && called && (
            <Link style={padding} to="/">
              <Button onClick={handleLogout} color="primary">
                Log out
              </Button>
            </Link>
          )
        }
        {
          // hidden upon successfull login
          !user && !data && (
            <Link style={padding} to="/login">
              Login
            </Link>
          )
        }
      </>
    );
  }

  return (
    <>
      <Link style={padding} to="/">
        LarryneMusic
      </Link>
      <Link style={padding} to="/photos">
        Photos
      </Link>
      <Link style={padding} to="/store">
        Store
      </Link>
      {
        // hidden upon successfull login
        !user && !data && (
          <Link style={padding} to="/login">
            Login
          </Link>
        )
      }
    </>
  );
};

export default NavBar;
