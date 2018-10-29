import React, { Component } from "react";
import { connect } from "react-redux";
import Carousel from "../../components/Carousel/Carousel";
import {
  getFavoritedMovies,
  getFavoritedSeries,
  getLikedMovies,
  getLikedSeries
} from "../../store/actions";
import styles from "./UserMedia.scss";
import Spinner from "../../components/UI/Spinner/Spinner";

class UserMedia extends Component {
  state = {
    showFavoritedMovies: true,
    showFavoritedSeries: false,
    showLikedMovies: false,
    showLikedSeries: false
  };

  componentDidMount() {
    this.props.getFavoritedMovies();
    this.props.getFavoritedSeries();
    this.props.getLikedMovies();
    this.props.getLikedSeries();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (!nextProps.isAuthLoading && !nextProps.isAuthenticated) {
      window.location.href = "/login";
    }
    return true;
  }

  showSectionToggle = target => {
    switch (target) {
      case "favorites-movies": {
        const showSection = this.state.showFavoritedMovies;
        return this.setState({ showFavoritedMovies: !showSection });
      }
      case "favorites-series": {
        const showSection = this.state.showFavoritedSeries;
        return this.setState({ showFavoritedSeries: !showSection });
      }
      case "likes-movies": {
        const showSection = this.state.showLikedMovies;
        return this.setState({ showLikedMovies: !showSection });
      }
      case "likes-series": {
        const showSection = this.state.showLikedSeries;
        return this.setState({ showLikedSeries: !showSection });
      }
      default:
        return null;
    }
  };

  render() {
    return (
      <div className={styles["container"]}>
        <div className={styles["favorites"]}>
          <div className={styles["area-overlap-favorites-movies-container"]}>
            <h1>Favorites</h1>
            <div className={styles["area-overlap-favorites-movies-title"]}>
              <div onClick={() => this.showSectionToggle("favorites-movies")}>
                <h1>
                  Movies{" "}
                  {this.state.showFavoritedMovies ? (
                    <i className="icon-up-open" />
                  ) : (
                    <i className="icon-down-open" />
                  )}
                </h1>
              </div>
            </div>
            <div
              className={[
                styles["favorites-movies-data"],
                this.state.showFavoritedMovies ? styles.open : styles.close
              ].join(" ")}
            >
              {this.props.isFavoritesLoading ? (
                <Spinner />
              ) : (
                <Carousel
                  itemsNumber={this.props.favorites.movies.length}
                  data={this.props.favorites.movies}
                />
              )}
            </div>
          </div>
          <div className={styles["favorites-series-container"]}>
            <div className={styles["area-overlap-favorites-series-title"]}>
              <div onClick={() => this.showSectionToggle("favorites-series")}>
                <h1>
                  Series{" "}
                  {this.state.showFavoritedSeries ? (
                    <i className="icon-up-open" />
                  ) : (
                    <i className="icon-down-open" />
                  )}
                </h1>
              </div>
            </div>
            <div
              className={[
                styles["favorites-series-data"],
                this.state.showFavoritedSeries ? styles.open : styles.close
              ].join(" ")}
            >
              {this.props.isFavoritesLoading ? (
                <Spinner />
              ) : (
                <Carousel
                  itemsNumber={this.props.favorites.series.length}
                  data={this.props.favorites.series}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles["likes"]}>
          <div className={styles["area-overlap-likes-movies-container"]}>
            <h1>Likes</h1>
            <div className={styles["area-overlap-likes-movies-title"]}>
              <div onClick={() => this.showSectionToggle("likes-movies")}>
                <h1>
                  Movies{" "}
                  {this.state.showLikedMovies ? (
                    <i className="icon-up-open" />
                  ) : (
                    <i className="icon-down-open" />
                  )}
                </h1>
              </div>
            </div>
            <div
              className={[
                styles["likes-movies-data"],
                this.state.showLikedMovies ? styles.open : styles.close
              ].join(" ")}
            >
              {this.props.isLikesLoading ? (
                <Spinner />
              ) : (
                <Carousel
                  itemsNumber={this.props.likes.movies.length}
                  data={this.props.likes.movies}
                />
              )}
            </div>
          </div>
          <div className={styles["likes-series-container"]}>
            <div className={styles["area-overlap-likes-series-title"]}>
              <div onClick={() => this.showSectionToggle("likes-series")}>
                <h1>
                  Series{" "}
                  {this.state.showLikedSeries ? (
                    <i className="icon-up-open" />
                  ) : (
                    <i className="icon-down-open" />
                  )}
                </h1>
              </div>
            </div>
            <div
              className={[
                styles["likes-series-data"],
                this.state.showLikedSeries ? styles.open : styles.close
              ].join(" ")}
            >
              {this.props.isLikesLoading ? (
                <Spinner />
              ) : (
                <Carousel
                  itemsNumber={this.props.likes.series.length}
                  data={this.props.likes.series}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAuthLoading: state.auth.loading,
    favorites: state.favorites.favorites,
    likes: state.likes.likes,
    isFavoritesLoading: state.favorites.loading,
    isLikesLoading: state.likes.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFavoritedMovies: () => dispatch(getFavoritedMovies()),
    getFavoritedSeries: () => dispatch(getFavoritedSeries()),
    getLikedMovies: () => dispatch(getLikedMovies()),
    getLikedSeries: () => dispatch(getLikedSeries())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMedia);
