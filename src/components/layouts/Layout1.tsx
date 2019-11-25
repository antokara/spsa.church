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
  >
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <Header />
      </Grid>
      <Grid item={true} xs={12}>
        <Routes />
      </Grid>
    </Grid>
  </Box>
);

export { Layout1 };
