import { getByTestId } from '@testing-library/react';
import { theme } from 'src/constants/theme';
import { TShared } from 'src/containers/app.test/describe/shared';
import { TDescribe } from 'src/containers/app.test/describe/TDescribe';

const describeMUIProvider: TDescribe = (
  shared: TShared
): (() => void) => (): void => {
  let node: ChildNode | null;
  beforeEach(() => {
    node = getByTestId(shared.rr.container, 'mock-mui-theme-consumer');
  });

  it('renders the consumer component', () => {
    expect(node).toBeTruthy();
  });

  it('provides access to the "theme.palette.primary.main"', () => {
    expect(node).toHaveAttribute(
      'data-palette-primary-main',
      theme.palette.primary.main
    );
  });

  it('provides access to the "theme.palette.secondary.main"', () => {
    expect(node).toHaveAttribute(
      'data-palette-secondary-main',
      theme.palette.secondary.main
    );
  });

  it('provides access to the "theme.palette.text.primary"', () => {
    expect(node).toHaveAttribute(
      'data-palette-text-primary',
      theme.palette.text.primary
    );
  });
};

export { describeMUIProvider };
