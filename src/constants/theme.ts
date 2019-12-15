import { createMuiTheme, Theme } from '@material-ui/core/styles';

type TTheme = Theme & {
  palette: {
    background: {
      layout?: string;
    };
  };
};

// style components Theme Object with Material UI theme combined
// @see https://www.styled-components.com/docs/advanced#theming
// @see https://material-ui.com/customization/default-theme/#default-theme
const theme: TTheme = createMuiTheme({
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
      primary: 'rgba(255,255,255,0.75)'
    },
    background: {
      default: 'rgba(155,92,63,0.35)',
      paper: '#9a5d40'
    }
  }
});

// set the custom theme props
theme.palette.background.layout = '#c68567';

export { theme };
