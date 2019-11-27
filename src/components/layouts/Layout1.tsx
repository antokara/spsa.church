import { Box, Grid } from '@material-ui/core';
import * as React from 'react';
import { Footer } from 'src/components/layouts/footer/Footer';
import { Header } from 'src/components/layouts/header/Header';
import { Routes } from 'src/components/layouts/Routes';
import { Separator } from 'src/components/shared/Separator';
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
          <Separator />
        </Box>
      </Grid>
      <Grid item={true} xs={12}>
        <Footer />
      </Grid>
    </Grid>
  </Box>
);

export { Layout1 };
