import React from "react";
import { useSelector } from "react-redux";
import { Grid, Card } from "semantic-ui-react";

const CardFooter = () => {
  const credits = useSelector(state => state.movies.selectedMovieCredits);
  // const movieData = useSelector(state => state.movies.selectedMovieData);

  return (
    <Card.Content>
      <Grid.Row>
        <strong>Director: </strong>
        {/* to handle error in case of no crew information */}
        {credits.crew.length !== 0
          ? credits.crew.find(item => item.job === "Director").name
          : ""}
      </Grid.Row>
      <Grid.Row>
        <strong>Stars: </strong>
        {credits.cast.slice(0, 5).map((item, index) => (
          <span key={index}>
            <strong>{` ${item.name} `}</strong>
            {index === 4 ? ` as ${item.character}` : ` as ${item.character}, `}
          </span>
        ))}
        <br />
        <span style={{ color: "dodgerblue" }}>
          <strong>See full cast and crew</strong>
          {/* <FullCastModal
              selectedMovieCredits={selectedMovieCredits}
              selectedMovieData={selectedMovieData}
            /> */}
        </span>
      </Grid.Row>
    </Card.Content>
  );
};

export default CardFooter;

// import React from "react";
// import { connect } from "react-redux";
// import { Grid, Card } from "semantic-ui-react";

// const CardFooter = props => {
//   const { credits /*selectedMovieData*/ } = props;
//   return (
//     <Card.Content>
//       <Grid.Row>
//         <strong>Director: </strong>
//         {/* to handle error in case of no crew information */}
//         {credits.crew.length !== 0
//           ? credits.crew.find(item => item.job === "Director").name
//           : ""}
//       </Grid.Row>
//       <Grid.Row>
//         <strong>Stars: </strong>
//         {credits.cast.slice(0, 5).map((item, index) => (
//           <span key={index}>
//             <strong>{` ${item.name} `}</strong>
//             {index === 4 ? ` as ${item.character}` : ` as ${item.character}, `}
//           </span>
//         ))}
//         <br />
//         <span style={{ color: "dodgerblue" }}>
//           <strong>See full cast and crew</strong>
//           {/* <FullCastModal
//               selectedMovieCredits={selectedMovieCredits}
//               selectedMovieData={selectedMovieData}
//             /> */}
//         </span>
//       </Grid.Row>
//     </Card.Content>
//   );
// };

// const mapStateToProps = state => ({
//   credits: state.movies.selectedMovieCredits,
//   movieData: state.movies.selectedMovieData
// });

// export default connect(mapStateToProps)(CardFooter);
