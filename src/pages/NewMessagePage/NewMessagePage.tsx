import React, { useMemo, CSSProperties, useReducer } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { Save } from '@material-ui/icons';

import { Card } from 'components/Card';
import { Flexbox } from 'components/FlexBox';
import { useDispatch } from 'react-redux';
import { EditableGroupActions } from 'store/EditableGroup';
import { FormStateType } from 'store/EditableGroup/types';
import { useParams } from 'react-router';

const useStyles = makeStyles(() => ({
  container: {
    '& > div': {
      margin: 8,
    },
  },
  widthTextField: {
    width: 600,
  },
}));

const saveIcon = <Save />;
const styleButton: CSSProperties = {
  marginTop: 12,
};

type ActionTypeFormReducer = {
  type: string;
  payload: string;
};

const formInitialState: FormStateType = {
  keywordTitle: '',
  keyword: '',
  text: '',
};

const formReducer = (state: FormStateType, action: ActionTypeFormReducer) => {
  switch (action.type) {
    case 'change_keyword_title': {
      return { ...state, keywordTitle: action.payload };
    }
    case 'change_keyword': {
      return { ...state, keyword: action.payload };
    }
    case 'change_text': {
      return { ...state, text: action.payload };
    }
    default:
      return state;
  }
};

const NewMessagePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, dispatchLocalState] = useReducer(formReducer, formInitialState);
  const param: { id: string } = useParams();
  const memoClasses = useMemo(
    () => ({
      root: classes.widthTextField,
    }),
    [classes.widthTextField]
  );

  const onClickHandler = () => {
    dispatch(
      EditableGroupActions.addNewKeyword({
        group_id: param.id,
        data: state,
      })
    );
  };

  const onChangeKeywordTitle = (event: { target: { value: string } }) => {
    dispatchLocalState({
      type: 'change_keyword_title',
      payload: event.target.value as string,
    });
  };

  const onChangeKeyword = (event: { target: { value: string } }) => {
    dispatchLocalState({
      type: 'change_keyword',
      payload: event.target.value as string,
    });
  };

  const onChangeTextHandler = (event: { target: { value: string } }) => {
    dispatchLocalState({
      type: 'change_text',
      payload: event.target.value as string,
    });
  };

  return (
    <Flexbox direction="column">
      <Flexbox direction="column" className={classes.container}>
        <TextField
          variant="outlined"
          label="Название ключевого слова"
          classes={memoClasses}
          onChange={onChangeKeywordTitle}
        />
        <TextField
          variant="outlined"
          label="Ключевое слово"
          classes={memoClasses}
          onChange={onChangeKeyword}
        />
      </Flexbox>
      <Card>
        <Flexbox direction="column">
          <h3>Ваше сообщение</h3>
          {/* 
            Добавить обработчик, который будет отсылать инфу на бэк и складывать в БД
          */}
          <TextField
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            onChange={onChangeTextHandler}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={saveIcon}
            style={styleButton}
            onClick={onClickHandler}
          >
            Сохранить
          </Button>
        </Flexbox>
      </Card>
    </Flexbox>
  );
};

export default NewMessagePage;
