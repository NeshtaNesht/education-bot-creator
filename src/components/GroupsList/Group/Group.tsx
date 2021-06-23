import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Flexbox } from 'components/FlexBox';
import { GroupsData } from 'store/Office/types';

const useStyles = makeStyles(() => ({
  root: {
    '& > a': {
      display: 'flex',
      align: 'center',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    '& img': {
      paddingRight: 20,
    },
  },
}));

const Group: React.FC<{ data: Partial<GroupsData> }> = ({ data }) => {
  const { photo_50, name, id } = data;
  const classes = useStyles();
  return (
    <Flexbox align="center" justify="center" className={classes.root}>
      <a
        href={`https://oauth.vk.com/authorize?client_id=${process.env.VK_APP_ID}&redirect_uri=${process.env.REDIRECT_URI_GROUP}&group_ids=${id}&display=popup&scope=photos,docs,manage,messages&response_type=code&state=${id}`}
      >
        <img src={photo_50} alt="Фото группы" />
        <h4>{name}</h4>
      </a>
    </Flexbox>
  );
};

export default Group;
// https://oauth.vk.com/authorize?client_id=7235921&
// redirect_uri=https://my.winwinbot.com/api/auth/sdk/vkontakte/callback-group&
// group_ids=155725324&
// display=popup&
// scope=photos,docs,messages,manage
// &response_type=code
// &state=ru%2C155725324
