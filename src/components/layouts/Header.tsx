import { Fab } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { menuOpen, TAction, TActionCreator } from 'src/actions/layout/menuOpen';

const Header: () => JSX.Element = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch();
  const menuOpenAc: TActionCreator = bindActionCreators(menuOpen, dispatch);
  const menuOpenSt: boolean = useSelector(
    // tslint:disable-next-line:no-any
    (state: any) => state.layout.menuOpen
  );
  const onClick: () => TAction = (): TAction => menuOpenAc(!menuOpenSt);

  return (
    <Fab color="primary" aria-label="menu" size="small" onClick={onClick}>
      <Menu />
    </Fab>
  );
};

export { Header };
