import * as React from 'react';
import InlineSVG, { IProps } from 'react-inlinesvg';
import { TAsset } from 'src/gql/shared/TAsset';
import { assetUrl } from 'src/helpers/assetUrl';
import styled from 'styled-components';

const StyledInlineSVG: React.FunctionComponent<IProps> = styled(InlineSVG)`
  width: 1em;
  height: 1em;
  * {
    fill: currentColor;
  }
`;

type TProps = {
  asset: TAsset;
  className?: string;
  alt?: string;
};

/**
 * SVG component that accepts a CMS asset as a prop and
 * handles the URL generation for the src / srcset
 *
 * replaces the string "{url}" found in sources[].srcSet with the URL
 * if a list of assets is provided, then, the {url[index]} will be replaced
 */
const SVG: (props: TProps) => JSX.Element | null = ({
  asset,
  className,
  alt,
}: TProps): JSX.Element | null => (
  <StyledInlineSVG
    src={assetUrl(asset.path)}
    alt={alt ?? asset.title}
    className={className}
    title={asset.title}
  />
);

export { SVG };
