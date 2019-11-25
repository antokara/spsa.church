import { Tab as MuiTab } from '@material-ui/core';
import { TabProps } from '@material-ui/core/Tab';
import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { default as styled } from 'styled-components';

/**
 * a styled Tab component that is need to create and pass the className prop
 * so that we can override the default MaterialUI css
 */
const ClassedTab: typeof MuiTab = styled(MuiTab)`
  min-width: 0;
`;

/**
 * navigation tab that removes the min-width css to allow it to fit in narrower views
 *
 * note: we must pass down some props such as the fullWidth, otherwise it does not work
 */
const NavTab: React.FunctionComponent<TabProps<'div', NavLinkProps>> = ({
  className,
  label,
  wrapped,
  to,
  value,
  fullWidth
}: TabProps<'div', NavLinkProps>): JSX.Element => (
  <ClassedTab
    fullWidth={fullWidth}
    classes={{ root: className }}
    label={label}
    wrapped={wrapped}
    component={NavLink}
    to={to}
    value={value}
  />
);

export { NavTab };
