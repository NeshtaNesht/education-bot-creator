import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { Flexbox } from 'components/FlexBox';
import { NewKeyword } from 'components/NewKeyword';
import { Card } from 'components/Card';
import { NewDialog } from 'components/NewDialog';
import { Subscribes } from 'components/Subscribes';
import { InnerGroups } from 'components/InnerGroups';
import { Mailing } from 'components/Mailing';

const buttons = [
  {
    key: 'keyword',
    title: 'Ключевые слова',
    component: <NewKeyword />,
  },
  {
    key: 'dialog',
    title: 'Диалоги',
    component: <NewDialog />,
  },
  {
    key: 'subscribes',
    title: 'Подписчики',
    component: <Subscribes />,
  },
  {
    key: 'innerGroups',
    title: 'Внутренние группы',
    component: <InnerGroups />,
  },
  {
    key: 'mailing',
    title: 'Рассылка',
    component: <Mailing />,
  },
];

const EditableGroupPage: React.FC = () => {
  const [key, setKey] = useState('keyword');

  const onChangeHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: unknown
  ) => {
    if (value) setKey(value as string);
  };

  return (
    <Card>
      <ToggleButtonGroup value={key} exclusive onChange={onChangeHandler}>
        {buttons.map((el) => (
          <ToggleButton key={el.key} value={el.key}>
            {el.title}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Flexbox>{buttons.find((e) => e.key === key)?.component}</Flexbox>
    </Card>
  );
};

export default EditableGroupPage;
