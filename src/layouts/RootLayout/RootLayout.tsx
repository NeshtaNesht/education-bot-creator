import { makeStyles } from '@material-ui/styles';
import { Container, Theme } from '@material-ui/core';
import React from 'react';
import { useAccessToken } from 'hooks';
import { Header } from './Header';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: 24,
    backgroundColor: theme.palette.grey['50'],
    width: '100%',
    height: '100vh',
  },
}));

const RootLayout: React.FC = ({ children }) => {
  useAccessToken();
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Container className={classes.root}>{children}</Container>
    </div>
  );
};

export default RootLayout;
