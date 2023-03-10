import React, { useContext, useState } from "react";

import styles from "./Footer.module.css";
import { Tab, Tabs, Typography } from "@mui/material";
import RouteContextTab from "../../../contexts/RouteTabContext";
import MAIN_ROUTES from "../../../constants/ROUTES";
import { FaLessThanEqual } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const [value, setValue] = useState(null);
  const routeValue = useContext(RouteContextTab);
  const { selectedIndex } = routeValue;

  return (
    <div className={styles.root}>
      <hr className={styles.divider} />
      <Typography className={styles.footerTitle} variant="h5">
        echo
      </Typography>
      <div className={styles.tabContainer}>
        <Link href="/">
          <div
            className={`${styles.tab} ${
              selectedIndex === null ? styles.selected : ""
            }`}
          >
            <button className={styles.tabButton}>
              <Typography className={styles.tabText} variant="body1">
                Home
              </Typography>
            </button>
          </div>
        </Link>
        {MAIN_ROUTES.map((route) => (
          <Link href={route.link} key={route.index}>
            <div
              className={`${styles.tab} ${
                selectedIndex === route.index ? styles.selected : ""
              }`}
            >
              <button className={styles.tabButton}>
                <Typography className={styles.tabText} variant="body1">
                  {route.titlePT}
                </Typography>
              </button>
            </div>
          </Link>
        ))}
      </div>
      <Typography className={styles.rights} variant="caption">
        © All Rights Reserved
      </Typography>
    </div>
  );
};

export default Footer;
