import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Grid } from '@material-ui/core';

import {
  EditableGroupActions,
  EditableGroupSelectors,
} from 'store/EditableGroup';
import { Keyword } from './Keyword';

const Keywords: React.FC = () => {
  const dispatch = useDispatch();
  const param: { id: string } = useParams();
  const data = useSelector(EditableGroupSelectors.keywords);

  const onDeleteHandler = useCallback(
    (id: string) => {
      dispatch(EditableGroupActions.deleteKeyword({ group_id: param.id, id }));
      dispatch(
        EditableGroupActions.getKeywords({
          group_id: param.id,
        })
      );
    },
    [dispatch, param.id]
  );

  const render = useMemo(
    () =>
      data.map((el) => {
        const { _id } = el;
        return (
          <Keyword
            key={_id}
            keyword={el.keyword}
            keywordTitle={el.keywordTitle}
            text={el.text}
            _id={_id}
            onDelete={onDeleteHandler}
          />
        );
      }),
    [data, onDeleteHandler]
  );

  useEffect(() => {
    dispatch(
      EditableGroupActions.getKeywords({
        group_id: param.id,
      })
    );
  }, [dispatch, param.id]);

  return (
    <Grid container spacing={1}>
      <Grid container justify="center">
        {render}
      </Grid>
    </Grid>
  );
};

export default Keywords;
