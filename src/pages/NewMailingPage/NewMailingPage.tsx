/* eslint-disable no-underscore-dangle */
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@material-ui/core';
import AsyncSelect from 'react-select/async';
import { Flexbox } from 'components/FlexBox';
import React, { useEffect, useMemo, useState } from 'react';
import cx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  EditableGroupActions,
  EditableGroupSelectors,
} from 'store/EditableGroup';
import { useStyles } from './styles';

const checkbox = <Checkbox />;

const NewMailingPage = (): JSX.Element => {
  const param: { id: string } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const innerGroups = useSelector(EditableGroupSelectors.innerGroups);
  const [selectedGroups, setSelectedGroup] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(EditableGroupActions.getInnerGroups({ group_id: param.id }));
  }, [dispatch, param.id]);

  const onChangeFormHandler = (event: unknown) => {
    const isFind = selectedGroups.find(
      (el) => el === (event as { target: { value: string } }).target.value
    );
    if (isFind) {
      const currentSelected = selectedGroups.filter(
        (el) => el !== (event as { target: { value: string } }).target.value
      );
      setSelectedGroup(currentSelected);
      return;
    }
    setSelectedGroup((prevState) => [
      ...prevState,
      (event as { target: { value: string } }).target.value,
    ]);
  };

  const onChangeMessageHandler = (event: unknown) => {
    setMessage((event as { target: { value: string } }).target.value);
  };

  const onSaveHandler = () => {
    dispatch(
      EditableGroupActions.addNewMailingMessage({
        group_id: param.id,
        groups: selectedGroups,
        message,
      })
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: OptionsOrGroups<unknown, GroupBase<unknown>>) => void
  ) => {};

  const onSearchChange = () => {};

  const innerGroupsRender = useMemo(
    () =>
      innerGroups.map((el) => (
        <FormControlLabel
          key={el._id}
          control={checkbox}
          name={el.name}
          label={el.name}
          value={el._id}
        />
      )),
    [innerGroups]
  );

  return (
    <Flexbox direction="column" className={classes.container}>
      <h3>Укажите группы для рассылки</h3>
      <FormGroup
        onChange={onChangeFormHandler}
        className={cx(classes.container, classes.container_margin)}
      >
        {innerGroupsRender}
      </FormGroup>
      <h4>
        ...или выберите пользователя из списка, которому необходимо отправить
        сообщение
      </h4>
      <div style={{ width: 300 }}>
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onInputChange={onSearchChange}
          placeholder="Пока недоступно"
          isDisabled
        />
      </div>
      <h4>Ваше сообщение</h4>
      <TextField
        multiline
        rows={10}
        fullWidth
        variant="outlined"
        value={message}
        onChange={onChangeMessageHandler}
      />
      <Button variant="contained" color="primary" onClick={onSaveHandler}>
        Отправить
      </Button>
    </Flexbox>
  );
};

export default NewMailingPage;
