import { makeStyles } from '@material-ui/core';
import { Auth } from 'components/Auth';
import { Flexbox } from 'components/FlexBox';
import React from 'react';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    width: '100%',
  },
  label: {
    color: palette.grey[500],
  },
  description: {
    fontSize: 16,
  },
  authContainer: {
    paddingBottom: 36,
  },
}));

const MainPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Flexbox
      className={classes.root}
      justify="center"
      direction="column"
      align="center"
    >
      <div className={classes.authContainer}>
        <Auth />
      </div>
      <h3>
        Привет. Это web-приложение для создания чат-ботов для групп VK.com.
      </h3>
      <span className={classes.description}>
        Ты сможешь научить бота отвечать на ключевые слова, которые пользователи
        будут писать в группу.
      </span>
      <span className={classes.description}>
        Также ты сможешь создавать диалоги и делать рассылку пользователям
        внутренних групп.
      </span>
      <h4 className={classes.label}>
        На данный момент можно создавать только одного бота на группу
      </h4>
    </Flexbox>
  );
};

export default MainPage;
