import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.scss";

const Card = props => {
  return (
    <Link to={`/${props.type}/${props.id}`} className={styles.container}>
      <div className={styles["image-container"]}>
        <img src={props.poster} alt={`${props.title} poster`} />
      </div>
      <div className={styles.caption}>
        <span className={styles.title}>{props.title}</span>
        <span>{props.rating}</span>
        <span>Release: {props.release}</span>
      </div>
    </Link>
  );
};

export default Card;
