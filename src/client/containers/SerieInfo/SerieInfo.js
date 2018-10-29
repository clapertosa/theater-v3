import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Poster from "../../components/Poster/Poster";
import Rating from "../../components/Rating/Rating";
import InfoCard from "../../components/InfoCard/InfoCard";
import InfoContent from "../../components/InfoCard/InfoContent/InfoContent";
import Cast from "../../components/Cast/Cast";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
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
import styles from "./SerieInfo.scss";

class SerieInfo extends Component {
  state = {
    showModal: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAuthenticated) {
      this.props.isFavorited({
        mediaId: this.props.media.id,
        mediaType: "serie"
      });
      this.props.isLiked({ mediaId: this.props.media.id, mediaType: "serie" });
    }
  }

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onSocialButtonHandler = e => {
    if (!this.props.isAuthenticated) {
      window.location.href = "/login";
    } else {
      if (e.target.name === "add-to-favorites") {
        this.props.addToFavorites({
          mediaId: this.props.media.id,
          mediaType: "serie",
          mediaTitle: this.props.media.name,
          mediaPosterPath: this.props.media.poster_path
        });
      } else if (e.target.name === "add-to-likes") {
        this.props.addToLikes({
          mediaId: this.props.media.id,
          mediaType: "serie",
          mediaTitle: this.props.media.name,
          mediaPosterPath: this.props.media.poster_path
        });
      } else if (e.target.name === "remove-from-favorites") {
        this.props.removeFromFavorites({
          mediaId: this.props.media.id,
          mediaType: "serie"
        });
      } else if (e.target.name === "remove-from-likes") {
        this.props.removeFromLikes({
          mediaId: this.props.media.id,
          mediaType: "serie"
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
              <h1 className={styles.title}>{this.props.media.name}</h1>
            </div>
            <div className={styles["social-container"]}>
              <div className={styles.favorites}>
                {this.props.favorited ? (
                  <button
                    name="remove-from-favorites"
                    onClick={this.onSocialButtonHandler}
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
                    name="add-to-favorites"
                    onClick={this.onSocialButtonHandler}
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
                    name="remove-from-likes"
                    onClick={this.onSocialButtonHandler}
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
                    name="add-to-likes"
                    onClick={this.onSocialButtonHandler}
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
              type="array"
              data={this.props.media.created_by}
            />
            <InfoContent
              type="array"
              category="Genres"
              data={this.props.media.genres || []}
            />
            <InfoContent
              category="Seasons"
              data={this.props.media.number_of_seasons}
            />
            <InfoContent
              category="Episodes"
              data={this.props.media.number_of_episodes}
            />
            <InfoContent
              category="First On The Air"
              data={this.props.media.first_air_date}
            />
            <InfoContent
              category="Episodes Run-time"
              data={this.props.media.episode_run_time}
            />
          </InfoCard>
        </div>
      </div>
    );
  }
}

const loadSerie = (store, path, query, params) => {
  const mediaId = params[0].match(/(\d+)/)[0];
  return store.dispatch(getMedia("serie", mediaId));
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
    getSerie: (mediaType, mediaId) => dispatch(getMedia(mediaType, mediaId)),
    addToFavorites: data => dispatch(addToFavorites(data)),
    addToLikes: data => dispatch(addToLikes(data)),
    removeFromFavorites: data => dispatch(removeFromFavorites(data)),
    removeFromLikes: data => dispatch(removeFromLikes(data)),
    isFavorited: data => dispatch(isFavorited(data)),
    isLiked: data => dispatch(isLiked(data))
  };
};

export { loadSerie };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SerieInfo);
