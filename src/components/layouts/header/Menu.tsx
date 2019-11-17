import { useQuery } from '@apollo/react-hooks';
import { Drawer, Fab, List, ListItem, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { menuOpen, TAction, TActionCreator } from 'src/actions/layout/menuOpen';
import * as getTheme from 'src/gql/theme/getTheme.gql';
import { TData, TMenuEntry } from 'src/gql/theme/TData';
import { TState } from 'src/reducers/defaultState';

const Menu: () => JSX.Element | null = (): JSX.Element | null => {
  const dispatch: Dispatch = useDispatch();
  const menuOpenAc: TActionCreator = bindActionCreators(menuOpen, dispatch);
  const menuOpenSt: boolean = useSelector(
    (state: TState) => state.layout.menuOpen
  );
  const onClick: () => TAction = (): TAction => menuOpenAc(!menuOpenSt);
  const { loading, data } = useQuery<TData>(getTheme);

  if (loading || !data) {
    return null;
  }

  const ListItems: JSX.Element[] = data.theme.headerMenu.menuEntries.map(
    (menuEntry: TMenuEntry) => (
      <ListItem
        button={true}
        key={menuEntry._id}
        component={Link}
        to={menuEntry.url}
      >
        <ListItemText primary={menuEntry.label} />
      </ListItem>
    )
  );

  return (
    <>
      <Fab color="primary" aria-label="menu" size="small" onClick={onClick}>
        <MenuIcon />
      </Fab>
      <Drawer open={menuOpenSt} onClose={onClick}>
        <div role="presentation" onClick={onClick} onKeyDown={onClick}>
          <List>{ListItems}</List>
        </div>
      </Drawer>
    </>
  );
};

export { Menu };
