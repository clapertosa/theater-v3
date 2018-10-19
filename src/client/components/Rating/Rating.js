import React from "react";
import styles from "./Rating.scss";

const Rating = props => {
  return (
    <div className={styles["rating-container"]}>
      <i className={`icon-star ${styles.star}`} />
      <div>
        <div className={styles.rating}>
          {props.rating}
          /10
        </div>
        <div className={styles.votes}>{props.votes} votes</div>
      </div>
    </div>
  );
};

export default Rating;
