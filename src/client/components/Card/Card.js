import React from "react";
import styles from "./Card.scss";

const Card = props => {
  return (
    <a
      href={`/${props.type}/${props.type.substring(0, props.type.length - 1)}/${
        props.id
      }`}
      className={styles.container}
    >
      <div className={styles["image-container"]}>
        <img
          src={
            props.poster
              ? `https://image.tmdb.org/t/p/w300${props.poster}`
              : "https://via.placeholder.com/350x450/0000000/ffffff?text=No%20Poster"
          }
          alt={`${props.title} poster`}
        />
      </div>
      <div className={styles.caption}>
        <span className={styles.title}>{props.title}</span>
        <span>{props.rating}</span>
        <span>Release: {props.release}</span>
      </div>
    </a>
  );
};

export default Card;
