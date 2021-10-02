import { Button, TextField } from '@material-ui/core';
import { Answer as AnswerComponent } from 'components/Answer';
import { Add } from '@material-ui/icons';
import { Flexbox } from 'components/FlexBox';
import React, { memo, useCallback, useMemo } from 'react';
import { Answer } from 'store/Dialogs/types';

const PlusIson = <Add />;

const Question = ({
  questionNum,
  isFinish = false,
  question,
  onChangeQuestion,
  answers,
  onAddAnswer,
}: {
  questionNum: number;
  isFinish?: boolean;
  question: string;
  onChangeQuestion: (
    questionNum: number,
    question: string,
    answers: Answer[]
  ) => void;
  onAddAnswer: (questionNum: number) => void;
  answers: Answer[];
}): JSX.Element => {
  const onChangeHandler = (event: any) => {
    if (onChangeQuestion)
      onChangeQuestion(questionNum, event.target.value, answers);
  };

  const onChangeAnswerHandler = useCallback(
    (answerNum: number, answer: string, point: number) => {
      const findItem = answers.find((el) => el.answerNum === answerNum);
      if (findItem) {
        findItem.answer = answer;
        findItem.point = point;
        const newAnswers = answers.map((el) =>
          el.answerNum === findItem.answerNum ? findItem : el
        );
        onChangeQuestion(questionNum, question, newAnswers);
      }
    },
    [answers, onChangeQuestion, question, questionNum]
  );

  const onDeleteAnswerHandler = useCallback(
    (answerNum: number) => {
      const newAnswers = answers.filter((el) => el.answerNum !== answerNum);

      onChangeQuestion(questionNum, question, newAnswers);
    },
    [answers, onChangeQuestion, question, questionNum]
  );

  const onAddAnswerHandler = () => {
    onAddAnswer(questionNum);
  };

  const renderAnswers = useMemo(
    () =>
      answers.map((el) => (
        <AnswerComponent
          key={`${el.answer}_${el.answerNum}`}
          answer={el.answer}
          answerNum={el.answerNum}
          point={el.point}
          onChangeAnswer={onChangeAnswerHandler}
          onDeleteAnswer={onDeleteAnswerHandler}
        />
      )),
    [answers, onChangeAnswerHandler, onDeleteAnswerHandler]
  );

  return (
    <Flexbox direction="column">
      <h5>{isFinish ? 'Заключительное сообщение' : `Вопрос ${questionNum}`}</h5>
      <TextField
        rows={4}
        fullWidth
        value={question}
        onChange={onChangeHandler}
        multiline
      />
      <div style={{ marginLeft: 30, width: '50%' }}>{renderAnswers}</div>
      <Button
        variant="outlined"
        color="primary"
        startIcon={PlusIson}
        onClick={onAddAnswerHandler}
      >
        Ответ
      </Button>
    </Flexbox>
  );
};

export default memo(Question);
