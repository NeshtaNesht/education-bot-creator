/* eslint-disable no-underscore-dangle */
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@material-ui/core';
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

  const innerGroupsRender = useMemo(
    () =>
      innerGroups.map((el) => (
        <FormControlLabel
          key={el._id}
          control={checkbox}
          name={el.name}
          label={el.name}
          value={el.name}
        />
      )),
    [innerGroups]
  );
  // ЗАКОНЧИТЬ РАССЫЛКУ
  return (
    <Flexbox direction="column" className={classes.container}>
      <FormGroup
        onChange={onChangeFormHandler}
        className={cx(classes.container, classes.container_margin)}
      >
        {innerGroupsRender}
        <h3>Ваше сообщение</h3>
        <TextField multiline rows={10} fullWidth variant="outlined" />
      </FormGroup>
      <Button variant="contained" color="primary">
        Отправить
      </Button>
    </Flexbox>
  );
};

export default NewMailingPage;
