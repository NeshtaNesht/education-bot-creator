/* eslint-disable @typescript-eslint/naming-convention */
import { Button, IconButton } from '@material-ui/core';
import { Flexbox } from 'components/FlexBox';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  EditableGroupActions,
  EditableGroupSelectors,
} from 'store/EditableGroup';
import { Delete } from '@material-ui/icons';
import history from 'utils/history';

const InnerGroups = (): JSX.Element => {
  const dispatch = useDispatch();
  const param: { id: string } = useParams();
  const onClickHandler = () => {
    history.push(`/office/${param.id}/new-inner-group`);
  };

  const innerGroups = useSelector(EditableGroupSelectors.innerGroups);

  const onDeleteInnerGroupHandler = useCallback(
    (id: string) => {
      dispatch(
        EditableGroupActions.deleteInnerGroup({ group_id: param.id, id })
      );
    },
    [dispatch, param.id]
  );

  useEffect(() => {
    dispatch(EditableGroupActions.getInnerGroups({ group_id: param.id }));
  }, [param.id, dispatch]);

  const data = useMemo(
    () =>
      innerGroups.map(({ name, _id }) => (
        <div
          key={_id}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 24,
            padding: 6,
            border: '1px solid #e0e0e0',
          }}
        >
          <span>
            <b>{name}</b>
          </span>
          <IconButton onClick={() => onDeleteInnerGroupHandler(_id)}>
            <Delete />
          </IconButton>
        </div>
      )),
    [innerGroups, onDeleteInnerGroupHandler]
  );

  return (
    <Flexbox direction="column">
      <h3>
        Добавляйте пользователей во внутренние группы. Это может понадобиться,
        например, для быстрой рассылки сообщений.
      </h3>
      <Button variant="contained" color="primary" onClick={onClickHandler}>
        Создать группу
      </Button>
      <Flexbox justify="space-between" direction="column">
        {data}
      </Flexbox>
    </Flexbox>
  );
};

export default InnerGroups;
