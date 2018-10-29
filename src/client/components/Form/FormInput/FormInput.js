import React from "react";
import styles from "./FormInput.scss";

const FormInput = props => {
  return (
    <div className={styles.container}>
      <div className={styles["input-container"]}>
        <label htmlFor={props.name}>
          {props.labelText ? (
            props.labelText
          ) : (
            <i className={`icon-${props.labelIcon}`} />
          )}
        </label>
        <input
          className={props.error ? styles.error : null}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
        />
      </div>
      {props.error ? (
        <span className={styles["error-message"]}>{props.error}</span>
      ) : null}
    </div>
  );
};

export default FormInput;
