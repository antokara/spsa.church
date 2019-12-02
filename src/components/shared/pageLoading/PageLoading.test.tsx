import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { PageLoading } from './PageLoading';

describe('PageLoading component', () => {
  let rr: RenderResult;
  let node: ChildNode | null;

  describe('with required props', () => {
    beforeEach(() => {
      rr = render(<PageLoading />);
      node = rr.container.firstChild;
    });

    it('renders the component', () => {
      expect(node).toMatchSnapshot();
    });

    describe('fade component', () => {
      let c: ChildNode | null;
      beforeEach(() => {
        c = rr.queryByTestId('fade');
      });

      it('gets rendered', () => {
        expect(c).toBeTruthy();
      });

      it('has opacity:1', () => {
        expect(c).toHaveStyle('opacity: 1');
      });
    });

    it('renders the circular progress', () => {
      expect(rr.queryByTestId('circular-progress')).toBeTruthy();
    });
  });

  describe('with prop.visible:true', () => {
    beforeEach(() => {
      rr = render(<PageLoading visible={true} />);
      node = rr.container.firstChild;
    });

    it('renders the component', () => {
      expect(node).toMatchSnapshot();
    });

    describe('fade component', () => {
      let c: ChildNode | null;
      beforeEach(() => {
        c = rr.queryByTestId('fade');
      });

      it('gets rendered', () => {
        expect(c).toBeTruthy();
      });

      it('has opacity:1', () => {
        expect(c).toHaveStyle('opacity: 1');
      });
    });

    it('renders the circular progress', () => {
      expect(rr.queryByTestId('circular-progress')).toBeTruthy();
    });

    describe('change prop.visible:false', () => {
      beforeEach(() => {
        rr.rerender(<PageLoading visible={false} />);
        node = rr.container.firstChild;
      });

      it('renders the component', () => {
        expect(node).toMatchSnapshot();
      });

      describe('fade component', () => {
        let c: ChildNode | null;
        beforeEach(() => {
          c = rr.queryByTestId('fade');
        });

        it('gets rendered', () => {
          expect(c).toBeTruthy();
        });

        it('has opacity:0', () => {
          expect(c).toHaveStyle('opacity: 0');
        });
      });
    });
  });
});
