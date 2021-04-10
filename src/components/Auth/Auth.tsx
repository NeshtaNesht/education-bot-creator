import React, { useCallback } from 'react';

import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, Redirect, useLocation, useParams } from 'react-router-dom';
import AuthActions from 'store/Auth/actions';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: 24,
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 3px ${theme.palette.grey[700]}`,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const code = location.search.split('=')[1];
    dispatch(AuthActions.vkAuth({ code }));
  }, [dispatch, location.search]);
  return (
    <div className={classes.root}>
      <TextField label="Email" />
      <TextField label="Пароль" />
      <a
        href={`https://oauth.vk.com/authorize?client_id=${process.env.VK_APP_ID}&redirect_uri=http://education-bot-creator.ru/&scope=email&display=popup&response_type=code`}
      >
        WITH LINK
      </a>
    </div>
  );
};

export default Auth;
