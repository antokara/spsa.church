import { Box, Button, Grid, Slide } from '@material-ui/core';
import { push } from 'connected-react-router';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Context } from 'src/helpers/installApp/Context';
import { EInstalled, IContext } from 'src/helpers/installApp/IContext';

/**
 * Install Application prompt component.
 *
 * Renders the "install app" prompt when needed
 */
const InstallAppPrompt: () => JSX.Element | null = (): JSX.Element | null => {
  // get the context
  const context: IContext = React.useContext(Context);

  // prepate the router push action
  const dispatch: Dispatch = useDispatch();
  const routerPushAc: typeof push = bindActionCreators(push, dispatch);

  // already inside the standalone PWA
  // show nothing
  if (context.standalone) {
    return null;
  }

  // when it is just installed, take the user to the app page to show the thank you...
  if (context.installed === EInstalled.justInstalled) {
    routerPushAc('/app');
  }

  // default to navigate to the "Install App" page
  let onInstallClick: () => void = (): void => {
    routerPushAc('/app');
  };
  // when the native install function is available, use it
  if (context.nativePromptToInstall) {
    onInstallClick = context.nativePromptToInstall;
  }

  // handle the "later" button
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
};

export { InstallAppPrompt };
