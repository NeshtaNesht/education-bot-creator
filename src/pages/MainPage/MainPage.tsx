import { makeStyles } from '@material-ui/core';
import { Auth } from 'components/Auth';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const MainPage: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Auth />
    </div>
  );
};

export default MainPage;
