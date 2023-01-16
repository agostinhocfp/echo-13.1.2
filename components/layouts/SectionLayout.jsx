import React from "react";

import styles from "./SectionLayout.module.css";

const SectionLayout = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default SectionLayout;
