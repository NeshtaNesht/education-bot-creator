import { Button } from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import { Dialogs } from 'components/Dialogs';
import { Flexbox } from 'components/FlexBox';
import React from 'react';
import { useParams } from 'react-router';
import history from 'utils/history';

const chatIcon = <Chat />;

const NewDialog = (): JSX.Element => {
  const param: { id: string } = useParams();

  const onClickHandler = () => {
    history.push(`/office/${param.id}/new-dialog`);
  };

  return (
    <Flexbox align="center" justify="center" direction="column">
      <h4>
        <b>
          Вы можете составить новый диалог с пользователем и прикрепить его к
          любому ключевому слову
        </b>
      </h4>
      <Button
        onClick={onClickHandler}
        variant="contained"
        color="primary"
        startIcon={chatIcon}
      >
        Добавить диалог
      </Button>
      <Dialogs />
    </Flexbox>
  );
};

export default NewDialog;
