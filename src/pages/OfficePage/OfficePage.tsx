import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';

import { OfficeActions, OfficeSelectors } from 'store/Office';
import { LoadingState } from 'store/types';
import { Flexbox } from 'components/FlexBox';
import GroupsList from 'components/GroupsList/GroupsList';
import { useLocation } from 'react-router';

/**
 * Что сделать:
 * Добавить визуал для добавления ответов на какие-то конкретные сообщения
 * Сделать функционал добавления клавиатуры для бота. Наприме, создать клавиатуру, наименование кнопок,
 * их расположение итд. После чего отправляю на бэк и там складываю в базу для конкретной группы
 * Сделать функционал, чтобы можно было добавлять какие-то сообщения и бот на них отвечал.
 * Например:
 * Тип: Ответ на входящее сообщение,
 * Равность: содержит, равно, не содержит и тд,
 * Текст: выав,
 * Ответ: и что на него ответить
 */

const OfficePage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const loading = useSelector(OfficeSelectors.loading);
  const userInfo = useSelector(OfficeSelectors.userInfo);

  useEffect(() => {
    const code = location.search.split('=')[1];
    const group_id = location.search.split('=')[2];
    if (code) {
      dispatch(OfficeActions.vkAuthGroup({ code, group_id }));
    }
  }, [dispatch, location.search]);

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
        <h4>Давайте создадим Вашего первого бота</h4>
        <GroupsList />
      </Flexbox>
    );
  }, [loading, userInfo.first_name, userInfo.last_name]);

  return render;
};

export default OfficePage;
