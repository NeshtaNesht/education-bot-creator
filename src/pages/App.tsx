import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';

import { MainPage } from './MainPage';

const App = (): JSX.Element => {
  useEffect(() => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    let code = `VK.init({ apiId: ${process.env.VK_APP_ID} })`;
    script.appendChild(document.createTextNode(code));
    document.body.appendChild(script);
  }, []);
  return (
    <Switch>
      <Route exact path="/" key="mainPage" component={MainPage} />
    </Switch>
  );
};

export default App;
