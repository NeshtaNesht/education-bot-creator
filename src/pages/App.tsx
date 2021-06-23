import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { EditableGroupPage } from './EditableGroupPage';

import { MainPage } from './MainPage';
import { NewMessagePage } from './NewMessagePage';
import { OfficePage } from './OfficePage';

const App = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/" key="mainPage" component={MainPage} />
      <Route exact path="/office" key="officePage" component={OfficePage} />
      <Route
        exact
        path="/office/:id"
        key="editablePage"
        component={EditableGroupPage}
      />
      <Route
        exact
        path="/office/:id/new-message"
        key="newMessagePage"
        component={NewMessagePage}
      />
    </Switch>
  );
};

export default App;
