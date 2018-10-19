import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "../../components/Card/Card";
import {
  getLatestMovies,
  getTopRatedMovies,
  getMostVotedMovies,
  getOnTheAirSeries,
  getTopRatedSeries,
  getMostPopularSeries
} from "../../store/actions";
import styles from "./Showcase.scss";
import Pagination from "../../components/Pagination/Pagination";

class Showcase extends Component {
  render() {
    const cards = this.props.cards.results.map(media => (
      <Card
        key={media.id}
        type={this.props.mediaType}
        id={media.id}
        title={media.title || media.name}
        rating={media.vote_average}
        release={media.release_date || media.first_air_date}
        poster={media.poster_path}
      />
    ));
    return (
      <React.Fragment>
        <div className={styles.content}>{cards}</div>
        <Pagination
          totalPages={this.props.cards.total_pages}
          page={this.props.cards.page - 1}
        />
      </React.Fragment>
    );
  }
}

const loadShowcase = (store, path, query) => {
  const page = query.page ? query.page : "1";

  switch (path) {
    case "/movies/latest":
      return store.dispatch(getLatestMovies(page));
    case "/movies/top-rated":
      return store.dispatch(getTopRatedMovies(page));
    case "/movies/most-voted":
      return store.dispatch(getMostVotedMovies(page));
    case "/series/on-the-air":
      return store.dispatch(getOnTheAirSeries(page));
    case "/series/top-rated":
      return store.dispatch(getTopRatedSeries(page));
    case "/series/most-popular":
      return store.dispatch(getMostPopularSeries(page));
    default:
      return store.dispatch(getLatestMovies(page));
  }
};

const mapStateToProps = state => {
  return {
    cards: state.cards.data,
    mediaType: state.cards.type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLatestMovies: page => dispatch(getLatestMovies(page)),
    getTopRatedMovies: page => dispatch(getTopRatedMovies(page)),
    getMostVotedMovies: page => dispatch(getMostVotedMovies(page)),
    getOnTheAirSeries: page => dispatch(getOnTheAirSeries(page)),
    getTopRatedSeries: page => dispatch(getTopRatedSeries(page)),
    getMostPopularSeries: page => dispatch(getMostPopularSeries(page))
  };
};

export { loadShowcase };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Showcase));
