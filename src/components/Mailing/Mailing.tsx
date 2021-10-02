import { Button } from '@material-ui/core';
import { Flexbox } from 'components/FlexBox';
import React from 'react';
import { useParams } from 'react-router';
import history from 'utils/history';
// import { Mailings } from './Mailings';

const Mailing = (): JSX.Element => {
  const param: { id: string } = useParams();

  const onClickHandler = () => {
    history.push(`/office/${param.id}/new-mailing`);
  };
  return (
    <Flexbox direction="column">
      <h3>Вы можете сделать рассылку пользователям внутренней группы</h3>
      <Button variant="contained" color="primary" onClick={onClickHandler}>
        Начать рассылку
      </Button>
      {/* <Mailings /> */}
    </Flexbox>
  );
};

export default Mailing;
