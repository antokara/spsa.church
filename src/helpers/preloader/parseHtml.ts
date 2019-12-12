import { THtmlTagItem } from 'src/gql/htmlTags/TData';
import { preloadAsset } from 'src/helpers/preloader/preloadAsset';
import { replaceTags } from 'src/helpers/replaceTags';

/**
 * parses the html for assets the preloads them
 */
const parseHtml: (html: string, tags: THtmlTagItem[]) => void = (
  html: string,
  tags: THtmlTagItem[]
): void => {
  // replace any tags
  const parsedHtml: string = replaceTags(html, tags);

  // preload img tags
  let rex: RegExp = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
  let result: string[] | null;
  do {
    result = rex.exec(parsedHtml);
    if (result) {
      preloadAsset(result[1]);
    }
  } while (result);

  // preload input button images
  rex = /<input[^>]+type="image"[^>]+src="?([^"\s]+)"[^>]*>/g;
  do {
    result = rex.exec(parsedHtml);
    if (result) {
      preloadAsset(result[1]);
    }
  } while (result);
};

export { parseHtml };
