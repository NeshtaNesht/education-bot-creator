/* eslint-disable @typescript-eslint/naming-convention */
import { Flexbox } from 'components/FlexBox';
import React, { CSSProperties, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { SubscribesActions, SubscribesSelectors } from 'store/Subscribes';
import {
  EditableGroupActions,
  EditableGroupSelectors,
} from 'store/EditableGroup';

const styles: {
  img: CSSProperties;
  span: CSSProperties;
  div: CSSProperties;
} = {
  img: {
    borderRadius: '50%',
  },
  span: {
    paddingLeft: 12,
  },
  div: {
    width: '100%',
  },
};

const Subscribes = (): JSX.Element => {
  const dispatch = useDispatch();
  const param: { id: string } = useParams();

  const subscribes = useSelector(SubscribesSelectors.subscribes);
  const countSubscribes = useSelector(SubscribesSelectors.countSubscribes);
  const innerGroups = useSelector(EditableGroupSelectors.innerGroups);

  useEffect(() => {
    dispatch(SubscribesActions.getSubscribes({ group_id: param.id }));
    dispatch(EditableGroupActions.getInnerGroups({ group_id: param.id }));
  }, [dispatch, param.id]);

  // TODO: Запилить добавление пользователя в группу
  const handleChangeGroup = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>,
      user_id: number
    ) => {
      dispatch(
        SubscribesActions.changeInnerGroup({
          inner_group_id: event.target.value as string,
          user_id,
          group_id: param.id,
        })
      );
    },
    [dispatch, param.id]
  );

  const data = useMemo(
    () =>
      subscribes.map(({ first_name, last_name, photo_50, inner_group, id }) => (
        <TableRow key={id}>
          <TableCell align="left">
            <Flexbox align="center">
              <img style={styles.img} src={photo_50} alt="Аватар" />
              <span style={styles.span}>{`${last_name} ${first_name}`}</span>
            </Flexbox>
          </TableCell>
          <TableCell align="left">
            <FormControl variant="outlined" style={{ minWidth: 180 }}>
              <Select
                value={inner_group}
                onChange={(
                  event: React.ChangeEvent<{
                    name?: string | undefined;
                    value: unknown;
                  }>
                ) => handleChangeGroup(event, id)}
                label="Группа"
              >
                {innerGroups.map(({ _id, name }) => (
                  <MenuItem key={_id} value={_id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TableCell>
        </TableRow>
      )),
    [handleChangeGroup, innerGroups, subscribes]
  );

  return (
    <Flexbox direction="column">
      <Flexbox>
        <h3>Подписчиков: {countSubscribes}</h3>
      </Flexbox>
      <div style={styles.div}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <b>Подписчик</b>
                </TableCell>
                <TableCell align="left">
                  <b>Внутренняя группа</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{data}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </Flexbox>
  );
};

export default Subscribes;
