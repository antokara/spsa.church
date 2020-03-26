import * as sanitizeHtml from 'sanitize-html';

const allowedAttributes:
  | boolean
  | {
      [index: string]: sanitizeHtml.AllowedAttribute[];
    }
  | undefined = {
  a: ['href', 'name', 'target'],
  img: ['src', 'alt', 'title'],
  figure: ['class'],
};

export { allowedAttributes };
