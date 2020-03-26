// the maximum width our layout should expand to
const unit: string = 'px';
const value: number = 1024;
const property: string = `${value}${unit}`;

type TMaxWidth = {
  unit: string;
  value: number;
  property: string;
};

const maxWidth: TMaxWidth = {
  unit,
  value,
  property,
};

export { maxWidth };
