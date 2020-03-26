import Box from '@material-ui/core/Box';
import * as React from 'react';

/**
 * Not Found page component.
 *
 * Renders the generic Page Not Found content
 */
const NotFound: () => JSX.Element | null = (): JSX.Element | null => (
  <Box p={4} py={8}>
    We&apos;re sorry but this Page does not exist!
  </Box>
);

export { NotFound };
