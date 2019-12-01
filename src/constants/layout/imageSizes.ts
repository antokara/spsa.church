// @see https://www.takeshape.io/docs/block-canvas-html-field/
type TImageSize = {
  w: number;
  h: number;
};

enum EImageSizes {
  df = 'default',
  sm = 'small',
  md = 'medium',
  lg = 'large'
}

type TImageSizes = {
  [EImageSizes.df]: TImageSize;
  [EImageSizes.sm]: TImageSize;
  [EImageSizes.md]: TImageSize;
  [EImageSizes.lg]: TImageSize;
};

const imageSizes: TImageSizes = {
  [EImageSizes.df]: {
    w: 500,
    h: 500
  },
  [EImageSizes.sm]: {
    w: 300,
    h: 500
  },
  [EImageSizes.md]: {
    w: 600,
    h: 900
  },
  [EImageSizes.lg]: {
    w: 1000,
    h: 1300
  }
};

export { imageSizes };
