import * as React from 'react';
import { Header } from 'src/components/layouts/header/Header';
import { Routes } from 'src/components/layouts/Routes';

const Layout1: () => JSX.Element = (): JSX.Element => (
  <div>
    <Header />
    <Routes />
  </div>
);

export { Layout1 };
