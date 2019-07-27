import "../styles/MoviesList.css";
import React from "react";
import { connect } from "react-redux";
import { imageClick, fetchMovies } from "../actions/movieActions";

class MoviesList extends React.Component {
  handleClick = id => {
    console.log(id);

    this.props.imageClick(id);
  };
  // componentDidMount() {
  //   console.log(`component mounted`);
  //   this.props.fetchMovies(this.props.title);
  // }

  // componentWillUpdate(prevProps) {
  //   console.log(prevProps);
  //   if (this.props.title !== prevProps.title) {
  //     this.props.fetchMovies(this.props.title);
  //   }
  // }
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.title);
  //   if (nextProps.title) {
  //     this.props.fetchMovies(nextProps.title);
  //   }
  // }

  render() {
    const { moviesData } = this.props;
    return (
      <div>
        <div className="ui container">
          <div className="image-list">
            {moviesData.map(item => (
              <img
                key={item.imdbID}
                alt={item.imdbID}
                src={item.Poster}
                onClick={() => this.handleClick(item.imdbID)}
              />
            ))}
          </div>
          <p />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moviesData: state.movies.moviesData,
  title: state.movies.title
});

export default connect(
  mapStateToProps,
  { imageClick, fetchMovies }
)(MoviesList);
