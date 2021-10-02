import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { EditableGroupActions } from 'store/EditableGroup';

const Mailings = (): JSX.Element => {
  const param: { id: string } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(EditableGroupActions.getMailings({ group_id: param.id }));
  }, [dispatch, param.id]);

  return <div />;
};

export default Mailings;
