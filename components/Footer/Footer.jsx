import React, { useContext } from "react";
import { Box } from "@mui/material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import { MAIN_ROUTES } from "../../constants/ROUTES";
import RouteTabContext from "../../contexts/RouteTabContext";
import useWindowSize from "../../util/hooks/useWindowSize.js";
import styles from "./Footer.module.css";

const Footer = () => {
  const width = useWindowSize();

  return (
    <>
      <div className={styles.root}>
        <h3 className={styles.title}>Footer</h3>
      </div>
    </>
  );
};

export default Footer;
