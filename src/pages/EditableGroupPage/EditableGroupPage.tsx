import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { Flexbox } from 'components/FlexBox';
import { NewKeyword } from 'components/NewKeyword';
import { Card } from 'components/Card';
import { NewDialog } from 'components/NewDialog';

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
];

const EditableGroupPage: React.FC = () => {
  const [key, setKey] = useState('keyword');

  const onChangeHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: unknown
  ) => {
    setKey(value as string);
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
