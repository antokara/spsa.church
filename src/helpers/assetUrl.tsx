import * as buildUrl from 'build-url';

/**
 * returns the absolute URL from the CMS for the asset provided
 *
 * @param path asset path provided by the CMS
 * @param queryParams optional. Object with key/value params
 */
const assetUrl: (
  path: string,
  queryParams?: { [name: string]: string | string[] }
) => string = (
  path: string,
  queryParams?: { [name: string]: string | string[] }
): string =>
  buildUrl(process.env.TAKESHAPE_ASSETS_HOST ?? '', {
    path,
    queryParams
  });

export { assetUrl };
