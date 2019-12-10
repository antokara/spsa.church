type TProps = {
  id: string;
};

type TPage = (props: TProps) => JSX.Element | null;

export { TPage, TProps };
