import { Theme, useTheme } from '@material-ui/core/styles';
import * as React from 'react';

/**
 * a mock functional component which consumes the material ui theme
 * @see https://material-ui.com/styles/advanced/#accessing-the-theme-in-a-component
 */
const MockMUIThemeConsumer: () => JSX.Element = (): JSX.Element => {
  const theme: Theme = useTheme();

  return (
    <div
      data-testid="mock-mui-theme-consumer"
      data-palette-primary-main={theme.palette.primary.main}
      data-palette-secondary-main={theme.palette.secondary.main}
      data-palette-text-primary={theme.palette.text.primary}
    >
      MockMUIThemeConsumer
    </div>
  );
};

export { MockMUIThemeConsumer };
