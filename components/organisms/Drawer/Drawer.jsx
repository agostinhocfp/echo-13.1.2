import React, { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import RouteTabContext from "../../../contexts/RouteTabContext";
import MAIN_ROUTES from "../../../constants/ROUTES";
import { SlMenu } from "react-icons/sl";
import styles from "./Drawer.module.css";
import Link from "next/link";
import { Grid, Typography } from "@mui/material";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  console.log(value);

  const routeValue = useContext(RouteTabContext);
  const { selectedIndex } = routeValue;

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <div className={styles.root}>
      <button
        className={styles.menuButton}
        type="button"
        aria-label="Navigation menu"
        onClick={toggleDrawer(true)}
      >
        <SlMenu className={styles.iconButton} />
      </button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div
          className={styles.drawerContainer}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div className={styles.logoContainer}>
            <Link href="./">
              <Typography className={styles.logoTitle} variant="h5">
                echo
              </Typography>{" "}
            </Link>
          </div>

          <hr className={styles.divider} />

          <div className={styles.contentContainer}>
            <List className={styles.list}>
              {MAIN_ROUTES.map((route) => (
                <Link href={route.link} key={route.index}>
                  <ListItem
                    className={`${styles.listItem} ${
                      selectedIndex === route.index ? styles.selected : ""
                    }`}
                    key={route.index}
                    value={route.index}
                    onClick={() =>
                      routeValue.onCurrentIndexChange({
                        selectedIndex: route.index,
                      })
                    }
                    disablePadding
                  >
                    <ListItemButton className={styles.listItemButton}>
                      <ListItemIcon className={styles.listItemIcon}>
                        {route.icon}
                      </ListItemIcon>
                      {/* <ListItemText primary={route.titlePT} /> */}
                      <Typography className={styles.listItemText} variant="h4">
                        {route.titlePT}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>

          {/* <div className={styles.bottomContainer}>
            <hr className={styles.divider} />

            <Link href="./">
              <Typography className={styles.logoTitle} variant="h5">
                echo
              </Typography>{" "}
            </Link>
          </div> */}
        </div>
      </Drawer>
    </div>
  );
}
