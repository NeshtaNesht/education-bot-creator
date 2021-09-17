import { TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import editableGroupActions from 'store/EditableGroup/actions';
import history from 'utils/history';

const NewInnerGroupPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const param: { id: string } = useParams();
  const [value, setValue] = useState('');
  const onChangeHandler = (event: { target: { value: string } }) => {
    setValue(event.target.value);
  };
  const onSaveHandler = () => {
    dispatch(
      editableGroupActions.addInnerGroups({ name: value, group_id: param.id })
    );
    history.push(`../${param.id}`);
  };
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextField
        variant="outlined"
        label="Название ключевого слова"
        onChange={onChangeHandler}
        value={value}
        style={{ marginBottom: 12 }}
      />
      <div>
        <Button variant="contained" color="primary" onClick={onSaveHandler}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default NewInnerGroupPage;
