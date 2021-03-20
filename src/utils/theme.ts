import { createMuiTheme } from '@material-ui/core';

import ComfortaaRegular from './fonts/comfortaa.woff2';

const fonts = {
  family: {
    regular: {
      fontFamily: 'Comfortaa-Regular',
      fontStyle: 'normal',
      fontWeight: 400,
      src: `url(${ComfortaaRegular}) format('woff2')`,
    },
  },
};

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Comfortaa-Regular',
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
