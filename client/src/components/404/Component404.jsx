// React Components
import React from "react";

// Styles
import styles from "./component404.module.scss";

const C404 = (props) => {
  return (
    <div className={styles.C404PageContainer}>
      <div className={styles.C404PageText}>
        {props.children}
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
        <p>{props.paragraph}</p>
        <img src={props.imageSRC} alt={props.imageAlt} />
      </div>
    </div>
  );
};

export default C404;
