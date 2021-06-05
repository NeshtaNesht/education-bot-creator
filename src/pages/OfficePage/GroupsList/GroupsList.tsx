import FlexBox from 'components/FlexBox/FlexBox';
import React from 'react';
import { useSelector } from 'react-redux';
import { OfficeSelectors } from 'store/Office';

const GroupsList: React.FC = () => {
  const groups = useSelector(OfficeSelectors.userGroups);
  const isLoading = useSelector(OfficeSelectors.isLoadingGroups);
  return <FlexBox justify="center">Список групп</FlexBox>;
};

export default GroupsList;
