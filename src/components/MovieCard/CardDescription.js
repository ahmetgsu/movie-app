import React from "react";
import { useSelector } from "react-redux";
import { Card } from "semantic-ui-react";

const CardDescription = () => {
  const movieData = useSelector(state => state.movies.selectedMovieData);
  return (
    <Card.Content>
      <Card.Description style={{ fontSize: "18px" }}>
        {movieData.overview}
      </Card.Description>
    </Card.Content>
  );
};

export default CardDescription;

// REACT_REDUX STYLE

// import React from "react";
// import { connect } from "react-redux";
// import { Card } from "semantic-ui-react";

// const CardDescription = props => {
//   const { movieData } = props;
//   return (
//     <Card.Content>
//       <Card.Description style={{ fontSize: "18px" }}>
//         {movieData.overview}
//       </Card.Description>
//     </Card.Content>
//   );
// };

// const mapStateToProps = state => ({
//   movieData: state.movies.selectedMovieData
// });

// export default connect(mapStateToProps)(CardDescription);
