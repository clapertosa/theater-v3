import React, { Component } from "react";
import { connect } from "react-redux";
import { search, searchReset } from "../../../../../store/actions";
import { debounce } from "lodash";
import styles from "./SearchBar.scss";

class SearchBar extends Component {
  state = {
    showResults: false
  };

  inputChange = debounce(query => {
    query && query.trim().length > 0
      ? this.props.search(query)
      : this.props.reset();
  }, 1000);

  render() {
    return (
      <div className={styles.container}>
        <i className="icon-search" />
        <input
          className={styles.input}
          onChange={e => this.inputChange(e.target.value)}
          onFocus={() => this.setState({ showResults: true })}
          onBlur={() =>
            setTimeout(() => this.setState({ showResults: false }), 100)
          }
          type="text"
          placeholder="Search movies/series"
        />
        <div
          style={{ display: this.state.showResults ? "block" : "none" }}
          className={styles["results-container"]}
        >
          <ul className={styles["results"]}>
            {this.props.success && this.props.totalResults >= 1 ? (
              this.props.results.slice(0, 8).map(result => {
                return (
                  <li key={result.id} className={styles["result-item"]}>
                    <a
                      className={styles["result-item-box"]}
                      href={
                        result.media_type === "movie"
                          ? `/movies/movie/${result.id}`
                          : `/series/serie/${result.id}`
                      }
                    >
                      <img
                        className={styles.poster}
                        src={
                          result.poster_path
                            ? `https://image.tmdb.org/t/p/w92${
                                result.poster_path
                              }`
                            : "https://via.placeholder.com/92x138text=No%20Poster"
                        }
                        alt={`${result.title || result.name} poster`}
                      />
                      <span className={styles.title}>
                        {result.title || result.name} (
                        {result.release_date
                          ? result.release_date.substring(0, 4)
                          : null || result.first_air_date
                            ? result.first_air_date.substring(0, 4)
                            : null}
                        )
                      </span>
                    </a>
                  </li>
                );
              })
            ) : this.props.totalResults <= 0 ? (
              <li className={styles["no-results"]}>No results found</li>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.searchbar.data.results,
    success: state.searchbar.success,
    totalResults: state.searchbar.data.total_results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: query => dispatch(search(query)),
    reset: () => dispatch(searchReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
