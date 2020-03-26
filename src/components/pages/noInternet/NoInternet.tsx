import Box from '@material-ui/core/Box';
import * as React from 'react';

/**
 * No Internet page component.
 *
 * Renders the generic No Internet content
 */
const NoInternet: () => JSX.Element | null = (): JSX.Element | null => (
  <Box p={4} py={8}>
    We&apos;re sorry but you need Internet to access this page. Please check
    your WiFi/Data access.
  </Box>
);

export { NoInternet };
