import React from "react";

// import { RiRefreshLine } from "react-icons/Ri";
import styles from "./MainButton.module.css";
import { Typography } from "@mui/material";

const MainButton = (props) => {
  return (
    <button className={styles.button} type="button">
      <Typography className={styles.text} variant="body1">
        {props.text} {"\u00A0"}
      </Typography>
      <props.buttonIcon className={styles.iconButton} />
    </button>
  );
};

export default MainButton;
