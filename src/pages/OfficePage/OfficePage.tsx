import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';

import { OfficeActions, OfficeSelectors } from 'store/Office';
import { LoadingState } from 'store/types';
import { Flexbox } from 'components/FlexBox';
import GroupsList from './GroupsList/GroupsList';

const OfficePage: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(OfficeSelectors.loading);
  const userInfo = useSelector(OfficeSelectors.userInfo);

  useEffect(() => {
    dispatch(OfficeActions.getUserInfo());
    dispatch(OfficeActions.getUserGroups());
  }, [dispatch]);

  const render = useMemo(() => {
    if (loading === LoadingState.LOADING) {
      return <Skeleton width={120} />;
    }
    if (loading === LoadingState.REJECT) {
      return <h2>Ошибка при загрузке данных</h2>;
    }
    return (
      <Flexbox align="center" justify="center" direction="column">
        <h2>{`Привет, ${userInfo.first_name} ${userInfo.last_name}`}</h2>
        <h4>
          Давайте создадим Вашего первого бота. Для начала выберите группу из
          списка, для которой Вы хотите создать бота
        </h4>
        <GroupsList />
      </Flexbox>
    );
  }, [loading, userInfo.first_name, userInfo.last_name]);

  return render;
};

export default OfficePage;
