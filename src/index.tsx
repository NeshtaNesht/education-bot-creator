import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import App from 'pages/App';
import { theme } from 'utils/theme';
import { store } from 'store';
import { RootLayout } from './layouts/RootLayout';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <RootLayout>
          <App />
        </RootLayout>
      </BrowserRouter>
      <CssBaseline />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
