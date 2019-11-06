/**
 * builds and returns an asset URL from the CMS
 * @param path asset path from CMS
 * @param params any additional parameters to be appended in the URL, must include ?
 */
const imgUrl: (path: string, params: string) => string = (
  path: string,
  params: string = ''
): string => `${process.env.TAKESHAPE_ASSETS_HOST}${path}${params}`;

export { imgUrl };
