import React, { memo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Android } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { Flexbox } from 'components/FlexBox';

const useStyles = makeStyles<Theme>((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  icon: {
    color: theme.palette.primary.dark,
    marginRight: 24,
    width: 36,
    height: 36,
    cursor: 'initial',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Header: React.FC = memo(() => {
  const classes = useStyles();
  const history = useHistory();
  const onClickHandler = () => {
    history.push('/');
  };
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Flexbox justify="space-between" align="center">
          <Box display="flex" alignItems="center">
            <Android className={classes.icon} onClick={onClickHandler} />
            <Typography variant="subtitle1">Education bot creator</Typography>
          </Box>
          <h5 style={{ color: 'red' }}>Пока что это только MVP</h5>
        </Flexbox>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
