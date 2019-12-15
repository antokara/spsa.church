import { default as Box } from '@material-ui/core/Box';
import { default as Grid } from '@material-ui/core/Grid';
import * as React from 'react';
import { Footer } from 'src/components/layouts/footer/Footer';
import { Header } from 'src/components/layouts/header/Header';
import { InstallAppPrompt } from 'src/components/layouts/InstallAppPrompt';
import { Routes } from 'src/components/layouts/Routes';
import { Separator } from 'src/components/shared/Separator';
import { maxWidth } from 'src/constants/layout/maxWidth';
import { Preloader } from 'src/helpers/preloader/Preloader';

// TODO: use render hook to flip the separator components
const Layout1: () => JSX.Element = (): JSX.Element => (
  <Box
    display="flex"
    justifyContent="center"
    maxWidth={maxWidth.property}
    mx="auto"
    position="relative"
    boxShadow={1}
    bgcolor="background.layout"
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
