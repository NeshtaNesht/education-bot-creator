/* eslint-disable @typescript-eslint/naming-convention */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { DialogActions, DialogSelectors } from 'store/Dialogs';
import { CircularProgress, styled } from '@material-ui/core';
import { DialogComponent } from './DialogComponent';
import { LoadingState } from 'store/types';

const DialogContainer = styled('div')(() => ({
  dispaly: 'flex',
  width: '100%',
  padding: 12,
  '& > div': {
    marginBottom: 12,
  },
  '& > div:last-child': {
    marginBottom: 0,
  },
}));

const Dialogs = (): JSX.Element => {
  const dispatch = useDispatch();
  const param: { id: string } = useParams();
  const data = useSelector(DialogSelectors.dialogs);
  const loading = useSelector(DialogSelectors.isLoadingDialog);

  const onDeleteHandler = useCallback(
    (id: string) => {
      dispatch(
        DialogActions.deleteDialog({
          id,
          group_id: param.id,
        })
      );
      dispatch(
        DialogActions.getDialogs({
          group_id: param.id,
        })
      );
    },
    [dispatch, param.id]
  );

  useEffect(() => {
    dispatch(
      DialogActions.getDialogs({
        group_id: param.id,
      })
    );
  }, [dispatch, param.id]);

  const render = useMemo(
    () =>
      data.map(({ _id, dialogName, questions }) => (
        <DialogComponent
          key={_id}
          questions={questions}
          dialogName={dialogName}
          _id={_id}
          onDelete={onDeleteHandler}
        />
      )),
    [data, onDeleteHandler]
  );

  return (
    <DialogContainer>
      {loading === LoadingState.LOADING ? <CircularProgress /> : render}
    </DialogContainer>
  );
};

export default Dialogs;
