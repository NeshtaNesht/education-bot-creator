import React, { useCallback } from 'react';

import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import authActions from 'store/Auth/actions';
import { Link, Redirect } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const onClickHandler = useCallback(async () => {
    await VK.Auth.login((props: any) => {
      console.log('auth in vk auth', props);
    });
    await VK.Api.call(
      'users.get',
      { user_ids: 35029650, v: '5.73' },
      (r: any) => {
        if (r.response) {
          console.log(r.response);
        }
      }
    );
    // dispatch(authActions.vkAuth());
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <TextField label="Email" />
      <TextField label="Пароль" />
      <Button
        style={{
          fontSize: 18,
        }}
        onClick={onClickHandler}
      >
        VK.com
      </Button>
      <a
        href={`https://oauth.vk.com/authorize?client_id=${process.env.VK_APP_ID}&redirect_uri=https://education-bot-creator.web.app&scope=email&display=popup&response_type=code`}
      >
        WITH LINK
      </a>
    </div>
  );
};

export default Auth;
