import { Box, Grid } from '@material-ui/core';
import * as React from 'react';
import { Footer } from 'src/components/layouts/footer/Footer';
import { Header } from 'src/components/layouts/header/Header';
import { InstallAppPrompt } from 'src/components/layouts/InstallAppPrompt';
import { Preloader } from 'src/components/layouts/Preloader';
import { Routes } from 'src/components/layouts/Routes';
import { Separator } from 'src/components/shared/Separator';
import { maxWidth } from 'src/constants/layout/maxWidth';

// TODO: use render hook to flip the separator components
const Layout1: () => JSX.Element = (): JSX.Element => (
  <Box
    display="flex"
    justifyContent="center"
    maxWidth={maxWidth.property}
    mx="auto"
    position="relative"
    boxShadow={1}
    bgcolor="background.paper"
  >
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <Box position="relative">
          <Header />
          <Separator />
        </Box>
      </Grid>
      <Grid item={true} xs={12}>
        <Box maxWidth="100%" position="relative">
          <Routes />
          <Separator absolute={false} />
        </Box>
      </Grid>
      <Grid item={true} xs={12}>
        <Footer />
      </Grid>
    </Grid>
    <InstallAppPrompt />
    <Preloader />
  </Box>
);

export { Layout1 };
