import { THtmlTagItem } from 'src/gql/htmlTags/TData';

/**
 * replaces the tags provided in the html and returns the result
 */
const replaceTags: (html: string, tags: THtmlTagItem[]) => string = (
  html: string,
  tags: THtmlTagItem[]
): string => {
  let newHtml: string = html;
  tags.forEach((tag: THtmlTagItem): void => {
    newHtml = newHtml.replace(tag.tag, tag.html);
  });

  return newHtml;
};

export { replaceTags };
