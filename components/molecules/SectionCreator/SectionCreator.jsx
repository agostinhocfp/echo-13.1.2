import React from "react";
import { Box, Container, Typography } from "@mui/material";

import theme from "../../../ui/theme";
import styles from "./SectionCreator.module.css";
import useWindowSize from "../../../util/hooks/useWindowSize.js";

const SectionCreator = ({
  title,
  subtitle,
  justifyTitle,
  bkgroundColor,
  children,
  icon,
}) => {
  const width = useWindowSize();

  return (
    <div className={styles.root}>
      <Typography
        className={`${styles.title}`}
        variant={width < 400 ? "h5" : "h4"}
        // fontWeight="700 !important"
        sx={{
          alignSelf: justifyTitle === "left" ? "flex-start" : null,
          color: theme.palette.special.contrast,

          [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        {!icon ? null : <Box>{icon}</Box>}
        {title}
      </Typography>

      <Typography className={styles.subtitle}>{subtitle}</Typography>
      {children}
    </div>
  );
};

SectionCreator.defaultProps = {
  justifyTitle: "center",
};

export default SectionCreator;
