import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import App from 'pages/App';
import { theme } from 'utils/theme';
import history from 'utils/history';
import { store } from 'store';
import { RootLayout } from './layouts/RootLayout';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <RootLayout>
          <App />
        </RootLayout>
      </Router>
      <CssBaseline />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
