import { MuiThemeProvider, Theme } from '@material-ui/core';
import * as React from 'react';
import { THEME } from 'src/constants/THEME';
import { ThemeProvider } from 'styled-components';

type TProps = React.PropsWithChildren<{
  theme?: Theme;
}>;

/**
 * a theme provider for both MaterialUI and Styled Components
 *
 * It can be used to test (styled) components
 * that need the theme prop easily.
 *
 * Unless a theme is specified, it will use the app's theme
 */
const MockThemeProvider: React.FunctionComponent<TProps> = ({
  children,
  theme = THEME
}: TProps): React.ReactElement<React.ReactNode> => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MuiThemeProvider>
);

export { MockThemeProvider };
