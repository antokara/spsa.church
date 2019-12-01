import { useQuery } from '@apollo/react-hooks';
import {
  AppBar,
  Box,
  Drawer,
  Fab,
  List,
  ListItemText,
  Tabs,
  useMediaQuery
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Location } from 'history';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { menuOpen, TAction, TActionCreator } from 'src/actions/layout/menuOpen';
import { maxWidth } from 'src/constants/layout/maxWidth';
import * as getTheme from 'src/gql/theme/getTheme.gql';
import { TData, TMenuEntry } from 'src/gql/theme/TData';
import { getMenuUrl } from 'src/helpers/getMenuUrl';
import { findActiveMenuEntries } from 'src/helpers/routes/findActiveMenuEntries';
import { TState } from 'src/reducers/defaultState';
import { ListItem } from './ListItem';
import { NavTab } from './NavTab';

/**
 * builds the menu tabs using the data and location provided
 */
const buildMenuTabs: (
  data: TData,
  activeRootMenuUrl: string | boolean
) => JSX.Element = (
  data: TData,
  activeRootMenuUrl: string | boolean
): JSX.Element => {
  const TabItems: JSX.Element[] = data.theme.headerMenu.menuEntries.map(
    (menuEntry: TMenuEntry) => {
      const menuUrl: string = getMenuUrl(menuEntry);

      return (
        <NavTab
          key={menuEntry._id}
          label={menuEntry.label}
          wrapped={true}
          to={menuUrl}
          value={menuUrl}
        />
      );
    }
  );

  return (
    <AppBar position="static">
      <Tabs
        value={activeRootMenuUrl}
        aria-label="menu"
        variant="fullWidth"
        scrollButtons="off"
      >
        {TabItems}
      </Tabs>
    </AppBar>
  );
};

/**
 * Header menu component.
 *
 * Renders the Menu Icon FAB which toggles the menu open state.
 * It also renders the Menu in a Drawer
 */
const Menu: () => JSX.Element | null = (): JSX.Element | null => {
  const dispatch: Dispatch = useDispatch();
  const menuOpenAc: TActionCreator = bindActionCreators(menuOpen, dispatch);
  const menuOpenSt: boolean = useSelector(
    (state: TState) => state.layout.menuOpen
  );

  // toggle the menu open state
  const onClick: () => TAction = (): TAction => menuOpenAc(!menuOpenSt);

  // get the theme data
  const { loading, data } = useQuery<TData>(getTheme);

  // get router location
  const location: Location = useLocation();

  // when we get the data, try to find the active menu(s)
  let activeMenus: TMenuEntry[] = [];
  let activeRootMenuUrl: string | boolean = false;
  if (data) {
    activeMenus = findActiveMenuEntries(
      location,
      data.theme.headerMenu.menuEntries
    );
    if (activeMenus.length) {
      activeRootMenuUrl = getMenuUrl(activeMenus[0]);
    }
  }

  // depending the device orientation/width, show the appropriate menu
  let menu: JSX.Element;
  if (useMediaQuery(`(min-width: ${maxWidth.property})`) && data) {
    // top menu
    menu = buildMenuTabs(data, activeRootMenuUrl);
  } else {
    // sandwitch menu
    menu = (
      <Box position="absolute" top={0} left={0} padding={1} zIndex={1}>
        <Fab
          color="primary"
          data-testid="menu-button"
          aria-label="menu"
          size="small"
          onClick={onClick}
        >
          <MenuIcon />
        </Fab>
      </Box>
    );
  }

  // in case the gql is loading or there is no data, do not show the menu
  if (loading || !data) {
    return null;
  }

  /**
   * builds the list items for the menu list
   */
  const ListItems: JSX.Element[] = data.theme.headerMenu.menuEntries.map(
    (menuEntry: TMenuEntry) => {
      const menuUrl: string = getMenuUrl(menuEntry);
      const selected: boolean = activeRootMenuUrl === menuUrl;

      return (
        <ListItem
          button={true}
          key={menuEntry._id}
          component={Link}
          to={menuUrl}
          selected={selected}
        >
          <ListItemText primary={menuEntry.label} />
        </ListItem>
      );
    }
  );

  return (
    <>
      <Box maxWidth="100%">{menu}</Box>
      <Drawer open={menuOpenSt} onClose={onClick}>
        <div role="presentation" onClick={onClick} onKeyDown={onClick}>
          <List>{ListItems}</List>
        </div>
      </Drawer>
    </>
  );
};

export { Menu };
