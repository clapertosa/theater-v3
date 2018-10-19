import React from "react";
import styles from "./Poster.scss";

const Poster = props => {
  return (
    <div className={styles.container}>
      <div className={styles["poster-container"]}>
        <img
          className={styles.poster}
          src={
            props.poster
              ? `https://image.tmdb.org/t/p/w342${props.poster}`
              : "https://via.placeholder.com/342x513/0000000/ffffff?text=No%20Poster"
          }
          alt={`${props.title} poster`}
        />
      </div>
    </div>
  );
};

export default Poster;
