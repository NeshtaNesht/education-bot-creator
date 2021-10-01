import { createMuiTheme } from '@material-ui/core';

import RobotoRegular from './fonts/Roboto-Regular.woff2';

const fonts = {
  family: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontStyle: 'normal',
      fontWeight: 400,
      src: `url(${RobotoRegular}) format('woff2')`,
    },
  },
};

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto-Regular',
  },
  overrides: {
    MuiTypography: {
      subtitle1: {
        fontWeight: 600,
        fontSize: 16,
      },
      subtitle2: {
        fontWeight: 400,
        fontSize: 14,
      },
    },
    MuiInput: {
      root: {
        width: '100%',
      },
    },
    MuiCssBaseline: {
      '@global': {
        '@font-face': [fonts.family.regular],
      },
    },
  },
});
