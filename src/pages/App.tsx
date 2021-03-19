import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { MainPage } from './MainPage';

const App = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/" key="mainPage" component={MainPage} />
    </Switch>
  );
};

export default App;
