import { createMuiTheme, Theme } from '@material-ui/core';

// style components Theme Object with Material UI theme combined
// @see https://www.styled-components.com/docs/advanced#theming
// @see https://material-ui.com/customization/default-theme/#default-theme
const theme: Theme = createMuiTheme({
  typography: {
    fontFamily: 'Noto Serif JP, sans-serif'
  },
  palette: {
    primary: {
      main: '#82171d'
    },
    secondary: {
      main: '#9a5d40'
    },
    text: {
      primary: '#ffffffc0'
    },
    background: {
      default: '#9a5d4059',
      paper: '#c68567ff'
    }
  }
});

export { theme };
