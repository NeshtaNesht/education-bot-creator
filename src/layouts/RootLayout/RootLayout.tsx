import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Theme } from '@material-ui/core';
import { Header } from './Header';
import { Footer } from './Footer';

const useStyles = makeStyles<Theme>((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: '1 0 auto',
    backgroundColor: theme.palette.grey['50'],
  },
  footer: {
    flex: '0 0 auto',
  },
  root: {
    padding: 24,
    width: '100%',
  },
}));

const RootLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Header />
        <Container className={classes.root}>{children}</Container>
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
