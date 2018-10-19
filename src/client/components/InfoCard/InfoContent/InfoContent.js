import React from "react";
import styles from "./InfoContent.scss";

const InfoContent = props => {
  return renderer(props);
};

const renderer = props => {
  switch (props.type) {
    case "url":
      return (
        <div className={styles["category-content"]}>
          <a className={styles.homepage} href={props.url} target="_blank">
            HomePage
          </a>
        </div>
      );
    case "array":
      return (
        <div className={styles["category-content"]}>
          <span className={styles["category-title"]}>{props.category}:</span>
          <p className={styles["category-data"]}>
            {props.data.map((array, index) => {
              return index < props.data.length - 1 ? (
                <span key={array.name}>{array.name}, </span>
              ) : (
                <span key={array.name}>{array.name}</span>
              );
            })}
          </p>
        </div>
      );
    default:
      return (
        <div className={styles["category-content"]}>
          <span className={styles["category-title"]}>{props.category}:</span>
          <p className={styles["category-data"]}>{props.data}</p>
        </div>
      );
  }
};

export default InfoContent;
