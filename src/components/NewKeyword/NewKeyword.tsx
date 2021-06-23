import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Flexbox } from 'components/FlexBox';
import React from 'react';
import { useParams } from 'react-router';
import history from 'utils/history';

const plusIcon = <Add />;

const NewKeyword: React.FC = () => {
  const param: { id: string } = useParams();
  const onClickHandler = () => {
    history.push(`/office/${param.id}/new-message`);
  };

  return (
    <Flexbox align="center" justify="center" direction="column">
      <h4>
        <b>
          Добавьте новое ключевое слово и ваш бот будет на него что-то отвечать
        </b>
      </h4>
      <Button
        startIcon={plusIcon}
        color="primary"
        variant="contained"
        onClick={onClickHandler}
      >
        Добавить сообщение
      </Button>
    </Flexbox>
  );
};

export default NewKeyword;
