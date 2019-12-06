import { preloadAsset } from 'src/helpers/preloader/preloadAsset';

/**
 * parses the html for assets the preloads them
 */
const parseHtml: (html: string) => void = (html: string): void => {
  const rex: RegExp = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
  let result: string[] | null;
  do {
    result = rex.exec(html);
    if (result) {
      preloadAsset(result[1]);
    }
  } while (result);
};

export { parseHtml };
