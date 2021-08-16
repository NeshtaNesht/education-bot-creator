/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useMemo, useReducer } from 'react';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Flexbox } from 'components/FlexBox';
import { Question as QuestionComponent } from 'components/Question';
import { Answer, Question } from 'store/Dialogs/types';
import dialogActions from 'store/Dialogs/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

const checkbox = <Checkbox />;

type NewDialog = {
  dialogName: string;
  question: Question[];
  isSingle: boolean;
};

const formInitialState: NewDialog = {
  dialogName: '',
  question: [
    {
      answers: [],
      question: '',
      questionNum: 1,
    },
  ],
  isSingle: false,
};

type ActionTypeFormReducer = {
  type: string;
  payload: any;
};

const formReducer = (state: NewDialog, action: ActionTypeFormReducer) => {
  switch (action.type) {
    case 'change_dialog_name': {
      return { ...state, dialogName: action.payload };
    }
    case 'change_question': {
      return { ...state, question: action.payload };
    }
    case 'change_is_single': {
      return { ...state, isSingle: action.payload };
    }
    case 'add_question': {
      return {
        ...state,
        question: [
          ...state.question,
          { answers: [], question: '', questionNum: state.question.length + 1 },
        ],
      };
    }
    case 'add_answer': {
      return {
        ...state,
        question: action.payload,
      };
    }
    case 'delete_question': {
      return {
        ...state,
        question: action.payload,
      };
    }
    default:
      return state;
  }
};

const NewDialogPage = (): JSX.Element => {
  const [state, dispatchLocalState] = useReducer(formReducer, formInitialState);
  const param: { id: string } = useParams();
  const dispatch = useDispatch();

  const onChangeDialogNameHandler = (event: any) => {
    dispatchLocalState({
      payload: event.target.value,
      type: 'change_dialog_name',
    });
  };

  const onChangeQuestionHandler = useCallback(
    (questionNum: number, question: string, answers: Answer[]) => {
      const findItem = (state.question as Question[]).find(
        (el) => el.questionNum === questionNum
      );
      if (findItem) {
        findItem.question = question;
        findItem.answers = answers;
        const newQuestion = (state.question as Question[]).map((el) =>
          el.questionNum === findItem.questionNum ? findItem : el
        );
        dispatchLocalState({
          payload: newQuestion,
          type: 'change_question',
        });
      }
    },
    [state.question]
  );

  const onClickAddNewQuestionHandler = () => {
    dispatchLocalState({
      payload: '',
      type: 'add_question',
    });
  };

  const onAddAnswerHandler = useCallback(
    (questionNum: number) => {
      const findItem = (state.question as Question[]).find(
        (el) => el.questionNum === questionNum
      );
      if (findItem) {
        findItem.answers.push({
          answer: '',
          answerNum: findItem.answers.length + 1,
          point: 0,
        });

        const newQuestions = (state.question as Question[]).map((el) =>
          el.questionNum === findItem.questionNum ? findItem : el
        );
        dispatchLocalState({
          payload: newQuestions,
          type: 'add_answer',
        });
      }
    },
    [state.question]
  );

  const onChangeIsSingleHandler = (
    event: React.ChangeEvent<{}>,
    checked: boolean
  ) => {
    dispatchLocalState({
      payload: checked,
      type: 'change_is_single',
    });
  };

  const onSaveHandler = () => {
    dispatch(
      dialogActions.addNewDialog({
        dialog: {
          dialogName: state.dialogName,
          questions: state.question as Question[],
          isSingle: state.isSingle,
        },
        group_id: param.id,
      })
    );
  };

  const renderQuestions = useMemo(
    () =>
      state.question.map((el: Question) => (
        <QuestionComponent
          key={el.questionNum}
          question={el.question}
          questionNum={el.questionNum}
          answers={el.answers}
          onChangeQuestion={onChangeQuestionHandler}
          onAddAnswer={onAddAnswerHandler}
        />
      )),
    [onAddAnswerHandler, onChangeQuestionHandler, state.question]
  );
  return (
    <Flexbox direction="column">
      <h3>Новый диалог</h3>
      <TextField
        label="Название диалога"
        fullWidth
        value={state.dialogName}
        onChange={onChangeDialogNameHandler}
      />
      <br />
      {renderQuestions}
      <br />
      <Button
        onClick={onClickAddNewQuestionHandler}
        variant="contained"
        color="default"
      >
        Добавить вопрос
      </Button>
      <div>
        <FormControlLabel
          control={checkbox}
          label="Пользователь может пройти диалог только один раз"
          onChange={onChangeIsSingleHandler}
        />
      </div>
      <div style={{ paddingTop: 24 }}>
        <Button onClick={onSaveHandler} variant="contained" color="primary">
          Сохранить
        </Button>
      </div>
    </Flexbox>
  );
};

export default NewDialogPage;
