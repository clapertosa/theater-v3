import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Poster from "../../components/Poster/Poster";
import Rating from "../../components/Rating/Rating";
import InfoCard from "../../components/InfoCard/InfoCard";
import InfoContent from "../../components/InfoCard/InfoContent/InfoContent";
import Cast from "../../components/Cast/Cast";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import {
  getMedia,
  addToFavorites,
  addToLikes,
  isFavorited,
  isLiked,
  removeFromFavorites,
  removeFromLikes
} from "../../store/actions";
import styles from "./MovieInfo.scss";

class MovieInfo extends Component {
  state = {
    showModal: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAuthenticated) {
      this.props.isFavorited({
        mediaId: this.props.media.id,
        mediaType: "movie"
      });
      this.props.isLiked({ mediaId: this.props.media.id, mediaType: "movie" });
    }
  }

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onSocialButtonHandler = target => {
    if (!this.props.isAuthenticated) {
      window.location.href = "/login";
    } else {
      if (target === "add-to-favorites") {
        this.props.addToFavorites({
          mediaId: this.props.media.id,
          mediaType: "movie",
          mediaTitle: this.props.media.title,
          mediaPosterPath: this.props.media.poster_path
        });
      } else if (target === "add-to-likes") {
        this.props.addToLikes({
          mediaId: this.props.media.id,
          mediaType: "movie",
          mediaTitle: this.props.media.title,
          mediaPosterPath: this.props.media.poster_path
        });
      } else if (target === "remove-from-favorites") {
        this.props.removeFromFavorites({
          mediaId: this.props.media.id,
          mediaType: "movie"
        });
      } else if (target === "remove-from-likes") {
        this.props.removeFromLikes({
          mediaId: this.props.media.id,
          mediaType: "movie"
        });
      }
    }
  };

  render() {
    return !this.props.media || Object.keys(this.props.media).length === 0 ? (
      <Redirect to="/notfound" />
    ) : (
      <div className={styles.container}>
        <Modal
          closeModal={this.closeModal}
          title="Trailer"
          showModal={this.state.showModal}
          video={
            this.props.media.videos.results[0]
              ? this.props.media.videos.results[0].key
              : null
          }
        />
        <div className={styles.poster}>
          <Poster
            title={this.props.media.title}
            poster={this.props.media.poster_path}
          />
          {this.props.media.videos.results[0] ? (
            <Button
              clicked={this.openModal}
              type="button"
              cursor="pointer"
              color="white"
              backgroundColor="#dd003f"
              border="1px solid #dd003f"
              margin="1rem 0 0 0"
              height="2rem"
              width="10rem"
              borderRadius="3%"
              textTransform="uppercase"
            >
              Watch Trailer
            </Button>
          ) : null}
        </div>
        <div className={styles.header}>
          <div className={styles["area-overlap-main-header"]}>
            <div className={styles["title-container"]}>
              <h1 className={styles.title}>{this.props.media.title}</h1>
            </div>
            <div className={styles["social-container"]}>
              <div className={styles.favorites}>
                {this.props.favorited ? (
                  <button
                    onClick={() =>
                      this.onSocialButtonHandler("remove-from-favorites")
                    }
                  >
                    <i className={`icon-heart ${styles.icon}`} />{" "}
                    {this.props.isFavoritesLoading ? (
                      <Spinner />
                    ) : (
                      <span className={styles.label}>Remove</span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      this.onSocialButtonHandler("add-to-favorites")
                    }
                  >
                    <i className={`icon-heart ${styles.icon}`} />{" "}
                    {this.props.isFavoritesLoading ? (
                      <Spinner />
                    ) : (
                      <span className={styles.label}>Add To Favorites</span>
                    )}
                  </button>
                )}
              </div>
              <div className={styles.likes}>
                {this.props.liked ? (
                  <button
                    onClick={() =>
                      this.onSocialButtonHandler("remove-from-likes")
                    }
                  >
                    <i className={`icon-thumbs-up-alt ${styles.icon}`} />{" "}
                    {this.props.isLikesLoading ? (
                      <Spinner />
                    ) : (
                      <span className={styles.label}>Remove</span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => this.onSocialButtonHandler("add-to-likes")}
                  >
                    <i className={`icon-thumbs-up-alt ${styles.icon}`} />{" "}
                    {this.props.isLikesLoading ? (
                      <Spinner />
                    ) : (
                      <span className={styles.label}>Like</span>
                    )}
                  </button>
                )}
              </div>
            </div>
            <Rating
              rating={this.props.media.vote_average}
              votes={this.props.media.vote_count}
            />
          </div>
          <div className={styles["info-header"]} />
        </div>
        <div className={styles["main-content"]}>
          <InfoCard header="Overview">
            <p>{this.props.media.overview}</p>
          </InfoCard>
          <InfoCard header="Cast">
            <Cast
              data={
                this.props.media.credits ? this.props.media.credits.cast : []
              }
            />
          </InfoCard>
        </div>
        <div className={styles["info-content"]}>
          <InfoCard header="Info">
            <InfoContent type="url" url={this.props.media.homepage} />
            <InfoContent
              category="Director"
              data={
                this.props.media.credits
                  ? this.props.media.credits.crew[0].name
                  : []
              }
            />
            <InfoContent
              type="array"
              category="Genres"
              data={this.props.media.genres || []}
            />
            <InfoContent
              category="Release"
              data={this.props.media.release_date}
            />
          </InfoCard>
        </div>
      </div>
    );
  }
}

const loadMovie = (store, path, query, params) => {
  const mediaId = params[0].match(/(\d+)/)[0];
  return store.dispatch(getMedia("movie", mediaId));
};

const mapStateToProps = state => {
  return {
    media: state.media.data,
    loading: state.media.loading,
    success: state.media.success,
    isAuthenticated: state.auth.isAuthenticated,
    isFavoritesLoading: state.favorites.loading,
    isLikesLoading: state.likes.loading,
    favorited: state.favorites.isFavorited,
    liked: state.likes.isLiked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovie: (mediaType, mediaId) => dispatch(getMedia(mediaType, mediaId)),
    addToFavorites: data => dispatch(addToFavorites(data)),
    addToLikes: data => dispatch(addToLikes(data)),
    removeFromFavorites: data => dispatch(removeFromFavorites(data)),
    removeFromLikes: data => dispatch(removeFromLikes(data)),
    isFavorited: data => dispatch(isFavorited(data)),
    isLiked: data => dispatch(isLiked(data))
  };
};

export { loadMovie };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieInfo);
