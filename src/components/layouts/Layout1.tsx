import { Box, Grid } from '@material-ui/core';
import * as React from 'react';
import { Header } from 'src/components/layouts/header/Header';
import { Routes } from 'src/components/layouts/Routes';
import { maxWidth } from 'src/constants/layout/maxWidth';

const Layout1: () => JSX.Element = (): JSX.Element => (
  <Box
    display="flex"
    justifyContent="center"
    maxWidth={maxWidth.property}
    mx="auto"
    position="relative"
    boxShadow={1}
  >
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <Header />
      </Grid>
      <Grid item={true} xs={12}>
        <Box maxWidth="100%" position="relative">
          <Routes />
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export { Layout1 };
