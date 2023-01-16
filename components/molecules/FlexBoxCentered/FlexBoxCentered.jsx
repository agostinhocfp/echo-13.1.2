import React from "react";
import { Box } from "@mui/material";

import styles from "./FlexBoxCentered.module.css";
const FlexBoxCentered = ({ children, ...props }) => {
  return (
    <Box className={styles.root} {...props}>
      {children}
    </Box>
  );
};

export default FlexBoxCentered;
