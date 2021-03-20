import { Button, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    margin: 'auto',
  },
}));

const AddIcon = <Add />;

const MainPage: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" startIcon={AddIcon}>
        Создать бота
      </Button>
    </div>
  );
};

export default MainPage;
