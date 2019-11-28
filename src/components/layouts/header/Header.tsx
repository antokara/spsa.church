import * as React from 'react';
import { Menu } from 'src/components/layouts/header/menu/Menu';
import { WideImage } from 'src/components/layouts/header/wideImage/WideImage';

const Header: () => JSX.Element = (): JSX.Element => (
  <>
    <Menu />
    <WideImage />
  </>
);

export { Header };
