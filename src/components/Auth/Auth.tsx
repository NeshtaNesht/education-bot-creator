import React from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AuthActions from 'store/Auth/actions';
import { Flexbox } from 'components/FlexBox';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: 24,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 6,
    width: 300,
    transition: theme.transitions.create('border', {
      duration: theme.transitions.duration.standard,
    }),
    '& h4': {
      margin: 0,
      paddingBottom: 12,
    },
    '&:hover': {
      borderColor: theme.palette.grey[400],
    },
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const code = location.search.split('=')[1];
    if (code) {
      dispatch(AuthActions.vkAuth({ code }));
    }
  }, [dispatch, location.search]);

  return (
    <Flexbox
      className={classes.root}
      align="center"
      justify="center"
      direction="column"
    >
      <h4>Авторизоваться через:</h4>
      <a
        href={`https://oauth.vk.com/authorize?client_id=${process.env.VK_APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=email&groups&display=popup&response_type=code`}
      >
        <img
          src="https://static.tildacdn.com/tild3731-3236-4364-b266-336436626566/photo.png"
          alt="VK"
          width={60}
          height={60}
        />
      </a>
    </Flexbox>
  );
};

export default Auth;
