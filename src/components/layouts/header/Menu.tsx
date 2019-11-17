import { Drawer, Fab, List, ListItem, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { menuOpen, TAction, TActionCreator } from 'src/actions/layout/menuOpen';
import { TState } from 'src/reducers/index';

const Menu: () => JSX.Element = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch();
  const menuOpenAc: TActionCreator = bindActionCreators(menuOpen, dispatch);
  const menuOpenSt: boolean = useSelector(
    (state: TState) => state.layout.menuOpen
  );
  const onClick: () => TAction = (): TAction => menuOpenAc(!menuOpenSt);

  return (
    <>
      <Fab color="primary" aria-label="menu" size="small" onClick={onClick}>
        <MenuIcon />
      </Fab>
      <Drawer open={menuOpenSt} onClose={onClick}>
        <div role="presentation" onClick={onClick} onKeyDown={onClick}>
          <List>
            <ListItem button={true} key="testMenu1">
              <ListItemText primary="testMenu1" />
            </ListItem>
            <ListItem button={true} key="testMenu2">
              <ListItemText primary="testMenu2" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export { Menu };
