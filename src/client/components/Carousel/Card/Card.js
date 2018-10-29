import React from "react";
import styles from "./Card.scss";

const Card = props => {
  return (
    <a href={`/${props.mediaType}s/${props.mediaType}/${props.id}`}>
      <div className={styles.container}>
        <div className={styles.poster}>
          <img
            src={`https://image.tmdb.org/t/p/w154${props.poster}`}
            alt="Poster"
          />
        </div>
        <div className={styles.title}>
          <span>{props.title}</span>
        </div>
      </div>
    </a>
  );
};

export default Card;
