import React from "react";
import styles from "./InfoCard.scss";

const InfoCard = props => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{props.header}</div>
      {props.children}
    </div>
  );
};

export default InfoCard;
