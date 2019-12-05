import { useQuery } from '@apollo/react-hooks';
import { Box, Button } from '@material-ui/core';
import { default as IOsA2HS } from 'assets/iOsA2HS.svg';
import { default as IOsShareSvg } from 'assets/iOsShare.svg';
import * as React from 'react';
import { NoInternet } from 'src/components/pages/noInternet/NoInternet';
import { PageLoading } from 'src/components/shared/pageLoading/PageLoading';
import { RichText } from 'src/components/shared/richText/RichText';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getInstallApp from 'src/gql/installApp/getInstallApp.gql';
import { TData } from 'src/gql/installApp/TData';
import { Context } from 'src/helpers/installApp/Context';
import {
  EInstalled,
  EPlatform,
  IContext
} from 'src/helpers/installApp/IContext';
type TProps = {
  id: string;
};

// TODO: remove when dynamic
// tslint:disable-next-line:max-func-body-length
const selectContent: (context: IContext) => JSX.Element = (
  context: IContext
): JSX.Element => {
  if (context.standalone) {
    // already inside the standalone PWA
    // give instructions on how the user can share the app with others
    return (
      <div>
        <p>You are already in the application.</p>
        <p>Please share it with anyone who you think might be interested.</p>
      </div>
    );
  } else {
    // accessed through a browser
    if (context.platform === EPlatform.iOS) {
      // show installation instructions for iOS
      return (
        <div>
          <p>To install the Application you need to</p>
          <ol>
            <li>
              tap on the share <IOsShareSvg /> button
            </li>
            <li>
              tap on the Add to Home Screen <IOsA2HS /> button
            </li>
          </ol>
          <p>
            After that, this application will be available in your Home Screen
            for quick access
          </p>
        </div>
      );
    } else if (context.platform === EPlatform.supported) {
      // installation prompt is supported but may not be available at this moment
      if (context.deferredPrompt) {
        // show the install button -> prompt
        type TInstallResult = () => void;
        let triggerInstallation: undefined | TInstallResult;
        triggerInstallation = (): void => {
          if (context.deferredPrompt) {
            context.deferredPrompt
              .prompt()
              .then()
              .catch();
          }
        };

        return (
          <div>
            <p>
              You may install the Application, for quick access and offline
              usage!
            </p>
            <Button
              color="primary"
              variant="contained"
              onClick={triggerInstallation}
            >
              Install
            </Button>
          </div>
        );
      } else if (context.installed === EInstalled.justInstalled) {
        // thank the user for installing the app and inform them how they can access it
        return (
          <div>
            <p>Thank you for Installing the Application!</p>
            <p>
              The Application can now be accessed from your Home Screen or App
              Drawer for quick access
            </p>
          </div>
        );
      } else if (context.installed === EInstalled.alreadyInstalled) {
        // inform the user that the app is already installed and how they can access it
        return (
          <div>
            <p>You have already installed the application.</p>
            <p>
              The Application can be accessed from your Home Screen or App
              Drawer for quick access
            </p>
          </div>
        );
      } else if (context.installed === EInstalled.maybeInstalled) {
        // it is probably installed but we're not sure and we do not have the ability to show the install button -> prompt
        // show instructions of how to manually install the app depending the browser
        return (
          <div>
            <p>You have already installed the application in the past.</p>
            <p>
              The Application should be accessible from your Home Screen or App
              Drawer for quick access.
            </p>
            <p>
              If you cannot find the application in your Home Screen or App
              Drawer
            </p>
            <ol>
              <li>open your browser's menu</li>
              <li>tap on the Add to Home Screen button</li>
            </ol>
          </div>
        );
      } else {
        // it is not installed and we do not have the ability to show the install button -> prompt
        // show instructions of how to manually install the app depending the browser
      }
    } else {
      // probably app installation is not supported,
      // just instruct user to add to home page using a generic method
    }
  }

  return (
    <div>
      <p>To install the Application you need to</p>
      <ol>
        <li>open your browser's menu</li>
        <li>tap on the Add to Home Screen button</li>
      </ol>
      <p>
        After that, this application will be available in your Home Screen/App
        Drawer for quick access
      </p>
    </div>
  );
};

/**
 * Install Application page component.
 *
 * Renders the "install app" page with its content
 */
const InstallApp: (props: TProps) => JSX.Element | null = ({
  id
}: TProps): JSX.Element | null => {
  // get the Install App page data
  const { loading, data, error } = useQuery<TData>(getInstallApp, {
    variables: { id, images: imageSizes }
  });

  // get the context
  const context: IContext = React.useContext(Context);

  // in case there is no internet, show the relative page
  if (error?.networkError) {
    return <NoInternet />;
  }

  // always show the loading so that it can fade away...
  const contents: JSX.Element[] = [
    <PageLoading key="loading" visible={loading} position="relative" />
  ];

  // in case the gql is loading or there is no data, do not show the page contents
  if (!loading && data) {
    contents.push(
      <RichText key="main" html={data.getInstallAppPage.contentHtml} />
    );
  }

  contents.push(
    React.cloneElement(selectContent(context), { key: 'installApp' })
  );

  return <Box px={2}>{contents}</Box>;
};

export { InstallApp };
