import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Context from '../../contexts/MovieCardContext';
import { Grid, Card, Image, Embed, Button } from 'semantic-ui-react';

const CardMedia = () => {
  const { activeIndex, handleClick } = useContext(Context);
  const movieData = useSelector(state => state.movies.selectedMovieData);

  return (
    <Card.Content>
      <Grid>
        <Grid.Column width={5}>
          <Image
            floated='left'
            src={`https://image.tmdb.org/t/p/w342${movieData.poster_path}`}
            style={{ margin: '0px', width: '100%' }}
          />
        </Grid.Column>
        <Grid.Column
          width={11}
          verticalAlign='middle'
          style={{ padding: '0px 5px 0px 0px' }}
        >
          <Embed
            id={
              movieData.videos.results.length === 0
                ? ''
                : movieData.videos.results[activeIndex].key
            }
            placeholder={`https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`}
            source='youtube'
            style={{ width: '100%' }}
            iframe={{ allowFullScreen: true }}
          />
          {movieData.videos.results
            .slice(
              0,
              movieData.videos.results.length >= 13
                ? 13
                : movieData.videos.results.length
            )
            .map((elem, index) => (
              <Button
                content={`${index + 1}`}
                style={{ marginTop: '5px' }}
                size='small'
                key={index}
                onClick={() => handleClick(`${index}`)}
              />
            ))}
        </Grid.Column>
      </Grid>
    </Card.Content>
  );
};

export default CardMedia;
