/* eslint-disable @typescript-eslint/naming-convention */
import { IconButton, styled } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import React from 'react';
import { Dialog as DialogType } from 'store/Dialogs/types';

const Dialog = styled('div')(() => ({
  border: '1px solid #e3e3e3',
  backgroundColor: '#fff',
  padding: '4px 8px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const DialogComponent = ({
  dialogName,
  questions,
  _id,
  onDelete,
}: DialogType & {
  onDelete: (id: string) => void;
  _id: string;
}): JSX.Element => {
  const onDeleteHandler = () => onDelete(_id);

  return (
    <Dialog>
      <b>{dialogName}</b>
      <div>
        <b>Вопросов: </b>
        <span>{questions.length}</span>
      </div>
      <IconButton onClick={onDeleteHandler}>
        <CloseOutlined />
      </IconButton>
    </Dialog>
  );
};

export default DialogComponent;
