import { Box, Button, Grid, Slide } from '@material-ui/core';
import * as React from 'react';
import { Context } from 'src/helpers/installApp/Context';
import {
  EInstalled,
  EPlatform,
  IContext
} from 'src/helpers/installApp/IContext';

/**
 * Install Application prompt component.
 *
 * Renders the "install app" prompt when needed
 */
const InstallAppPrompt: () => JSX.Element | null = (): JSX.Element | null => {
  // get the context
  const context: IContext = React.useContext(Context);

  // already inside the standalone PWA
  // show nothing
  if (context.standalone) {
    return null;
  }

  // check if already shown/times

  // accessed through a browser
  if (
    context.platform === EPlatform.iOS ||
    (context.platform === EPlatform.supported &&
      (!context.installed || context.installed === EInstalled.no))
  ) {
    let onInstallClick: () => void = (): void => {
      return;
    };
    if (context.nativePromptToInstall) {
      onInstallClick = context.nativePromptToInstall;
    }

    const onLaterClick: () => void = (): void => {
      if (context.setPromptVisibility) {
        context.setPromptVisibility(false);
      }
    };

    // show installation prompt when iOS or
    // when platform supports installation and it's not installed
    return (
      <Box position="fixed" bottom="1em">
        <Slide
          direction="up"
          in={context.isPromptVisible}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <Box padding={1} bgcolor="secondary.dark" boxShadow={2}>
            <Grid container={true} spacing={2}>
              <Grid item={true}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={onInstallClick}
                >
                  Install App
                </Button>
              </Grid>
              <Grid item={true}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onLaterClick}
                >
                  Later
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Slide>
      </Box>
    );
  }

  return null;
};

export { InstallAppPrompt };
