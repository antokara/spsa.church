import { useMediaQuery } from '@material-ui/core';
import { maxWidth } from 'src/constants/layout/maxWidth';

/**
 * a functional component hook that
 * returns the css value to use, depending on the window's width
 *
 * @param scalable css value to use when the window's width is under the maxWidth
 *                 usually, a dynamic value such as "vw"
 * @param fixed css value to use when the window's width is above the maxWidth
 *                 usually, a fixed value such as "10rem"
 */
const useCss: (scalable: string, fixed: string) => string = (
  scalable: string,
  fixed: string
): string =>
  useMediaQuery(`(max-width: ${maxWidth.property})`) ? scalable : fixed;

export { useCss };
