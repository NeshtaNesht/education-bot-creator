import React, { useMemo, CSSProperties, useReducer, useEffect } from 'react';
import {
  makeStyles,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { Save } from '@material-ui/icons';

import { Card } from 'components/Card';
import { Flexbox } from 'components/FlexBox';
import { useDispatch, useSelector } from 'react-redux';
import { EditableGroupActions } from 'store/EditableGroup';
import { FormStateType } from 'store/EditableGroup/types';
import { useParams } from 'react-router';
import { DialogActions, DialogSelectors } from 'store/Dialogs';

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
  dialogId: '',
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
    case 'change_dialog': {
      return { ...state, dialogId: action.payload };
    }
    default:
      return state;
  }
};

const NewMessagePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, dispatchLocalState] = useReducer(formReducer, formInitialState);
  const dialogs = useSelector(DialogSelectors.dialogs);
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

  const onChangeSelectedDialogHandler = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    dispatchLocalState({
      type: 'change_dialog',
      payload: event.target.value as string,
    });
  };

  const renderDialogItems = useMemo(
    () =>
      dialogs.map(({ _id, dialogName }) => (
        <MenuItem key={_id} value={_id}>
          {dialogName}
        </MenuItem>
      )),
    [dialogs]
  );

  useEffect(() => {
    dispatch(
      DialogActions.getDialogs({
        group_id: param.id,
      })
    );
  }, [dispatch, param.id]);

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
          <TextField
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            onChange={onChangeTextHandler}
          />
        </Flexbox>
        <Flexbox direction="column">
          <h3>Выберите диалог, который будет начат после этого слова</h3>
          <InputLabel htmlFor="dialog-selected">Список диалогов</InputLabel>
          <Select
            id="dialog-selected"
            defaultValue=""
            onChange={onChangeSelectedDialogHandler}
          >
            {renderDialogItems}
          </Select>
        </Flexbox>
      </Card>
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
  );
};

export default NewMessagePage;
