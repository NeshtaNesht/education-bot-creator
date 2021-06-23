import { Flexbox } from 'components/FlexBox';
import { WithSkelet } from 'components/HOC';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { OfficeSelectors } from 'store/Office';
import { Group } from './Group';

const GroupsList: React.FC = () => {
  const groups = useSelector(OfficeSelectors.userGroups);
  const isLoading = useSelector(OfficeSelectors.isLoadingGroups);
  const renderGroups = useMemo(
    () => groups.map((el) => <Group key={el.id} data={el} />),
    [groups]
  );
  return (
    <Flexbox justify="center" direction="row" align="center">
      <WithSkelet isLoading={isLoading} width={200}>
        {renderGroups}
      </WithSkelet>
    </Flexbox>
  );
};

export default GroupsList;
