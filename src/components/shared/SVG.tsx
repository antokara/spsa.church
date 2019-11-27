import * as React from 'react';
import { default as InlineSVG } from 'react-inlinesvg';
import { TAsset } from 'src/gql/shared/TAsset';
import { assetUrl } from 'src/helpers/assetUrl';

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
  alt
}: TProps): JSX.Element | null => {
  let iAlt: string;
  let iSrc: string;
  iSrc = assetUrl(asset.path);
  iAlt = alt ?? asset.title;

  return (
    <InlineSVG
      src={iSrc}
      alt={iAlt}
      className={className}
      title={asset.title}
    />
  );
};

export { SVG };
