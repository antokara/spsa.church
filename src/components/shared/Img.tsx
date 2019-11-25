import * as React from 'react';
import { TAsset } from 'src/gql/shared/TAsset';
import { assetUrl } from 'src/helpers/assetUrl';
import { default as styled } from 'styled-components';

type TSource = {
  srcSet: string;
  media: string;
};

type TProps = {
  assets: TAsset | TAsset[];
  className?: string;
  alt?: string;
  sources?: TSource[];
};

/**
 * constrains the img/source children, to maxWidth 100%
 */
const PictureMaxW: React.FunctionComponent<React.HTMLProps<
  HTMLPictureElement
>> = styled.picture`
  img,
  source {
    max-width: 100%;
  }
`;

type TSourceElement = React.SourceHTMLAttributes<HTMLSourceElement>;

/**
 * Image component that accepts a CMS asset as a prop and
 * handles the URL generation for the src / srcset
 *
 * replaces the string "{url}" found in sources[].srcSet with the URL
 * if a list of assets is provided, then, the {url[index]} will be replaced
 */
const Img: (props: TProps) => JSX.Element | null = ({
  assets,
  className,
  alt,
  sources
}: TProps): JSX.Element | null => {
  let iAlt: string;
  let iSrc: string | string[];
  let sSrc: string;
  if (Array.isArray(assets)) {
    iSrc = assets.map((asset: TAsset) => assetUrl(asset.path));
    sSrc = iSrc[0];
    iAlt = alt ?? assets[0].title;
  } else {
    iSrc = assetUrl(assets.path);
    sSrc = iSrc;
    iAlt = alt ?? assets.title;
  }

  const sourceElements: TSourceElement[] | undefined = sources?.map(
    (sourceEntry: TSource, si: number): TSourceElement => {
      let srcSet: string = '';
      if (Array.isArray(iSrc)) {
        srcSet = sourceEntry.srcSet;
        iSrc.forEach((src: string, srci: number) => {
          srcSet = srcSet.replace(`{url[${srci}]}`, src);
        });
      } else {
        srcSet = sourceEntry.srcSet.replace('{url}', iSrc);
      }

      return (
        <source
          key={`source-${si}`}
          media={sourceEntry.media}
          srcSet={srcSet}
        />
      );
    }
  );

  return (
    <PictureMaxW>
      {sourceElements}
      <img src={sSrc} alt={iAlt} className={className} />
    </PictureMaxW>
  );
};

export { Img, TSource };
