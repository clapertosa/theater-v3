import React from "react";
import styles from "./Cast.scss";

const Cast = props => {
  return props.data.slice(0, 10).map((actor, index) => {
    return (
      <div key={index} className={styles.content}>
        <div className={styles.actors}>
          <img
            src={`https://image.tmdb.org/t/p/w45/${actor.profile_path}`}
            alt={actor.name}
          />
          &nbsp;
          <span>{actor.name}</span>
        </div>
        <div className={styles.characters}>as {actor.character}</div>
      </div>
    );
  });
};

export default Cast;
