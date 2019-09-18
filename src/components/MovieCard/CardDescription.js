import React from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";

const CardDescription = props => {
  //console.log(props);
  const { movieData } = props;
  return (
    <Card.Content>
      <Card.Description style={{ fontSize: "18px" }}>
        {movieData.overview}
      </Card.Description>
    </Card.Content>
  );
};

const mapStateToProps = state => ({
  movieData: state.movies.selectedMovieData
});

export default connect(mapStateToProps)(CardDescription);
