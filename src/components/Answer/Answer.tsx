import { Icon, TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Flexbox } from 'components/FlexBox';
import React, { memo } from 'react';

const Answer = ({
  answer,
  answerNum,
  point,
  onChangeAnswer,
  onDeleteAnswer,
}: {
  answerNum: number;
  answer: string;
  point: number;
  onChangeAnswer?: (answerNum: number, answer: string, point: number) => void;
  onDeleteAnswer?: (answerNum: number) => void;
}): JSX.Element => {
  const onChangeAnswerHandler = (event: any) => {
    if (onChangeAnswer) onChangeAnswer(answerNum, event.target.value, point);
  };

  const onChangePointHandler = (event: any) => {
    if (onChangeAnswer)
      onChangeAnswer(answerNum, answer, Number(event.target.value));
  };

  const onClickDeleteAnswerHandler = () => {
    if (onDeleteAnswer) onDeleteAnswer(answerNum);
  };

  return (
    <Flexbox align="center" justify="space-between">
      <span>{`${answerNum}. Ответ:`}</span>
      <TextField autoFocus value={answer} onChange={onChangeAnswerHandler} />
      <span>Баллов:</span>
      <TextField value={point} onChange={onChangePointHandler} />
      <Icon style={{ cursor: 'pointer' }} onClick={onClickDeleteAnswerHandler}>
        <Delete />
      </Icon>
    </Flexbox>
  );
};

export default memo(Answer);
