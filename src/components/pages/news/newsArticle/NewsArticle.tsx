import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import locale from 'date-fns/locale/en-US/index';
import * as React from 'react';
import { RichText } from 'src/components/shared/richText/RichText';
import { TNewsArticle } from 'src/gql/newsArticles/TData';
import { assetUrl } from 'src/helpers/assetUrl';
import { Card } from './Card';
import { CardContent } from './CardContent';
import { CardMedia } from './CardMedia';

type TProps = {
  newsArticle: TNewsArticle;
};

/**
 * News Article component.
 *
 * Renders a news article with its content
 */
const NewsArticle: (props: TProps) => JSX.Element | null = ({
  newsArticle,
}: TProps): JSX.Element | null => {
  const image: string = assetUrl(newsArticle.photo.path, {
    fit: 'crop',
    h: '250',
    w: '250',
  });

  let date: string = '';
  if (newsArticle.date) {
    date = format(new Date(newsArticle.date), 'MMMM do yyy', { locale });
  }

  return (
    <Box pb={2}>
      <Card>
        <CardMedia image={image} />
        <CardContent>
          <Typography component="h5" variant="h5">
            {newsArticle.title}
          </Typography>
          <RichText html={newsArticle.contentHtml} />
          <Typography variant="overline">{date}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export { NewsArticle };
