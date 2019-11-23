import { ListItem as MuiListItem, WithTheme } from '@material-ui/core';
import { ListItemProps } from '@material-ui/core/ListItem';
import { default as styled } from 'styled-components';

/**
 * highlights the selected menu item
 * when used with component={react-router-dom/NavLink}
 */
const ListItem: typeof MuiListItem = styled(MuiListItem)`
  &.active,
  &.active:hover,
  &.active:focus {
    background: ${(p: ListItemProps & WithTheme): string =>
      p.theme.palette.action.selected};
  }
`;

export { ListItem };
