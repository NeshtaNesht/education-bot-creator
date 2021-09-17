import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { EditableGroupPage } from './EditableGroupPage';

import { MainPage } from './MainPage';
import { NewDialogPage } from './NewDialogPage';
import { NewMessagePage } from './NewMessagePage';
import { OfficePage } from './OfficePage';
import { NewInnerGroupPage } from './NewInnerGroupPage';

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
      <Route
        exact
        path="/office/:id/new-dialog"
        key="newDialogPage"
        component={NewDialogPage}
      />
      <Route
        exact
        path="/office/:id/new-inner-group"
        key="newInnerGroup"
        component={NewInnerGroupPage}
      />
    </Switch>
  );
};

export default App;
