import React from "react";
import ModernLoader from "../ModernLoader/ModernLoader";

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.root}>
      <ModernLoader className={styles.spinner} />
    </div>
  );
};

export default Loader;
