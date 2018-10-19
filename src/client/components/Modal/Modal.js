import React from "react";
import styles from "./Modal.scss";

const Modal = props => {
  return props.showModal ? (
    <div className={styles.container} onClick={props.closeModal}>
      <div className={styles["modal-container"]}>
        <div className={styles.header}>
          <span>{props.title}</span>
          <span className={styles.close} onClick={props.closeModal}>
            X
          </span>
        </div>
        <div className={styles.video}>
          <iframe
            title="trailer"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${props.video}`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.footer}>
          <button type="button" onClick={props.closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
