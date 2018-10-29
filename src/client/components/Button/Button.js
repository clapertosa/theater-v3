import React from "react";
import styles from "./Button.scss";

const Button = props => {
  return (
    <button
      className={styles.button}
      type={props.type || "button"}
      onClick={props.clicked}
      style={{
        cursor: props.cursor,
        color: props.color,
        backgroundColor: props.backgroundColor,
        border: props.border,
        margin: props.margin,
        height: props.height,
        width: props.width,
        borderRadius: props.borderRadius,
        textTransform: props.textTransform
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
