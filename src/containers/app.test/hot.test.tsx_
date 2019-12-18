describe('App container', () => {
  let App: React.FunctionComponent;
  type TMockHotComponent = (
    component: React.FunctionComponent
  ) => React.FunctionComponent;
  type TMockHotModule = (mdl: NodeModule) => TMockHotComponent;
  let mockComponent: jest.MockedFunction<TMockHotComponent>;
  let mockModule: jest.MockedFunction<TMockHotModule>;
  let mockModuleId: jest.MockedFunction<(id: string) => void>;

  beforeAll(() => {
    // initialize the mocked Hot functions
    mockModuleId = jest.fn();
    mockComponent = jest.fn(
      (component: React.FunctionComponent): React.FunctionComponent => {
        component.displayName = `react-hot-loader/${component.name}`;

        return component;
      }
    );
    mockModule = jest.fn(
      (mdl: NodeModule): TMockHotComponent => {
        mockModuleId(mdl.id);

        return mockComponent;
      }
    );
  });

  beforeEach(async () => {
    jest.resetModules();

    jest.doMock('ReactHotLoader', () => ({
      hot: mockModule
    }));

    ({ App } = await import('../App'));
  });

  it('invokes the "react-hot-loader" with module', () => {
    expect(mockModule).toHaveBeenCalledTimes(1);
    expect(mockModuleId).toHaveBeenCalledWith(
      `${process.cwd()}/src/containers/App.tsx`
    );
  });

  it('invokes the "react-hot-loader" with the component', () => {
    expect(mockComponent).toHaveBeenCalledTimes(1);
    expect(mockComponent).toHaveBeenCalledWith(App);
  });

  it('returns the result of react-hot-loader/hot', () => {
    expect(App.displayName).toMatch('react-hot-loader/App');
  });
});
