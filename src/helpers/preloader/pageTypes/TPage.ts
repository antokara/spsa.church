import { THtmlTagItem } from 'src/gql/htmlTags/TData';

type TProps = {
  id: string;
  htmlTags?: THtmlTagItem[];
};

type TPage = (props: TProps) => JSX.Element | null;

export { TPage, TProps };
