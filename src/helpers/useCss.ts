import { useMediaQuery } from '@material-ui/core';
import { maxWidth } from 'src/constants/layout/maxWidth';

/**
 * a functional component hook that
 * returns the css value to use, depending on the window's width
 *
 * @param scalable css value to use when the window's width is under the maxW
 *                 usually, a dynamic value such as "vw"
 * @param fixed css value to use when the window's width is above the maxW
 *                 usually, a fixed value such as "10rem"
 * @param maxW optional. Maximum width for the media query.
 *                 Defaults to the constant maxWidth.property
 */
const useCss: (scalable: string, fixed: string, maxW?: string) => string = (
  scalable: string,
  fixed: string,
  maxW: string = maxWidth.property
): string => (useMediaQuery(`(max-width: ${maxW})`) ? scalable : fixed);

export { useCss };
