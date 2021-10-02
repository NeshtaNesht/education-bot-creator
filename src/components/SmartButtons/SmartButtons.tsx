import { Flexbox } from 'components/FlexBox';
import React from 'react';
import { styled } from '@material-ui/core';

const TextBadge = styled('div')(() => ({
  padding: '12px 8px',
  backgroundColor: '#0A97B0',
  display: 'block',
  color: '#F7F7F7',
  borderLeft: '10px solid #1B6CA8',
  borderRadius: 4,
  fontSize: 14,
}));

const SmartButtons: React.FC = () => {
  return (
    <Flexbox direction="column">
      <h4>Умные кнопки:</h4>
      <TextBadge>
        Умные кнопки будут отображаться под сообщением и выполнять определенное
        действие.
      </TextBadge>
    </Flexbox>
  );
};

export default SmartButtons;
