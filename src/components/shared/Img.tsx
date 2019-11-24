import * as React from 'react';
import { TAsset } from 'src/gql/shared/TAsset';
import { assetUrl } from 'src/helpers/assetUrl';
import { default as styled } from 'styled-components';

type TSource = {
  srcSet: string;
  media: string;
};

type TProps = {
  asset: TAsset;
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
 */
const Img: (props: TProps) => JSX.Element | null = ({
  asset,
  className,
  alt,
  sources
}: TProps): JSX.Element | null => {
  const iSrc: string = assetUrl(asset.path);
  const iAlt: string = alt ?? asset.title;
  const sourceElements: TSourceElement[] | undefined = sources?.map(
    (se: TSource, index: number): TSourceElement => (
      <source
        key={`source-${index}`}
        media={se.media}
        srcSet={se.srcSet.replace('{url}', iSrc)}
      />
    )
  );

  return (
    <PictureMaxW>
      {sourceElements}
      <img src={iSrc} alt={iAlt} className={className} />
    </PictureMaxW>
  );
};

export { Img, TSource };
