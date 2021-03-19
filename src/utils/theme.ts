import { createMuiTheme } from '@material-ui/core';

import RobotoRegular from './fonts/RobotoCondensed-Regular.ttf';
import RobotoBold from './fonts/RobotoCondensed-Bold.ttf';
import RobotoItalic from './fonts/RobotoCondensed-Italic.ttf';
import RobotoLight from './fonts/RobotoCondensed-Light.ttf';

const fonts = {
  family: {
    regular: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 400,
      src: `url(${RobotoRegular}) format('ttf')`,
    },
    bold: {
      fontFamily: 'Roboto-Bold',
      fontStyle: 'normal',
      fontWeight: 600,
      src: `url(${RobotoBold}) format('ttf')`,
    },
    italic: {
      fontFamily: 'Roboto-Italic',
      fontStyle: 'normal',
      fontWeight: 400,
      src: `url(${RobotoItalic}) format('ttf')`,
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontStyle: 'normal',
      fontWeight: 300,
      src: `
      local('Roboto'),
      local('Roboto-Light'),
      url(${RobotoLight}) format('ttf')
    `,
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
        '@font-face': [
          fonts.family.regular,
          fonts.family.bold,
          fonts.family.italic,
          fonts.family.light,
        ],
      },
    },
  },
});
