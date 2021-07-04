import React, { memo } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseOutlined } from '@material-ui/icons';

import { Flexbox } from 'components/FlexBox';
import { KeywordsData } from 'store/EditableGroup/types';

const useStyles = makeStyles(() => ({
  root: {
    margin: 8,
    padding: 8,
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, .1)',
    width: '100%',
  },
  titleContainer: {
    width: '100%',
    borderBottom: '1px solid #e0e0e0',
    '& > button': {
      padding: 0,
    },
  },
  title: {
    padding: 4,
    margin: 0,
  },
}));

const Keyword: React.FC<
  Pick<KeywordsData, 'keyword' | 'keywordTitle' | 'text' | '_id'> & {
    onDelete: (id: string) => void;
  }
> = ({ _id = '', keyword, keywordTitle, onDelete, text }) => {
  const classes = useStyles();

  const onDeleteHandler = () => onDelete(_id);

  return (
    <Grid item xs={4} className={classes.root}>
      <Flexbox
        justify="space-between"
        align="center"
        className={classes.titleContainer}
      >
        <h3 className={classes.title}>{keywordTitle}</h3>
        <IconButton onClick={onDeleteHandler}>
          <CloseOutlined />
        </IconButton>
      </Flexbox>
      <article>
        <b>Ключевое слово:</b>
      </article>
      <text>{keyword}</text>
      <article>
        <b>Ваш ответ:</b>
      </article>
      <text>{text}</text>
    </Grid>
  );
};

export default memo(Keyword);
