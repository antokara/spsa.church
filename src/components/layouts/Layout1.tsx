import { Box, Grid } from '@material-ui/core';
import * as React from 'react';
import { Header } from 'src/components/layouts/header/Header';
import { Routes } from 'src/components/layouts/Routes';

const Layout1: () => JSX.Element = (): JSX.Element => (
  <Box
    display="flex"
    justifyContent="center"
    maxWidth="1024px"
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
