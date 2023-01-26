import React from "react";

import styles from "./FlexBoxCentered.module.css";
const FlexBoxCentered = ({ children, ...props }) => {
  return (
    <div className={styles.root} {...props}>
      {children}
    </div>
  );
};

export default FlexBoxCentered;
