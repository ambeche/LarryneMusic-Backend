import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme from './muiTheme';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const ProgressBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CircularProgress color="secondary" size={30} />
        <CircularProgress color="primary" />
      </ThemeProvider>
    </div>
  );
};

export default ProgressBar;
