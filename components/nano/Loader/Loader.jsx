import React from "react";
import { Box } from "@mui/material";
import ModernLoader from "../ModernLoader/ModernLoader";

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <Box className={styles.root}>
      <ModernLoader className={styles.spinner} />
    </Box>
  );
};

export default Loader;
