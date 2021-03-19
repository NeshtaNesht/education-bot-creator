import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import App from 'pages/App';
import { theme } from 'utils/theme';
import { RootLayout } from './layouts/RootLayout';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <RootLayout>
        <App />
      </RootLayout>
    </BrowserRouter>
    <CssBaseline />
  </ThemeProvider>,
  document.getElementById('root')
);
