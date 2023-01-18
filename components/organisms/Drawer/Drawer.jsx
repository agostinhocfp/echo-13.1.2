import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
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
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [mouseoverStatus, setMouseOverStatus] = useState(false);

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

  const handleMouseOver = (e) => {};

  return (
    <div>
      <React.Fragment>
        <button className={styles.menuButton} onClick={toggleDrawer(true)}>
          <SlMenu className={styles.iconButton} />
        </button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {MAIN_ROUTES.map((route) => (
                <Link href={route.link} key={route.index}>
                  <ListItem
                    key={route.index}
                    className={`${styles.listItem} ${mouseoverStatus}`}
                    onMouseOver={handleMouseOver}
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
                      <Typography
                        className={styles.listItemText}
                        variant="body1"
                      >
                        {route.titlePT}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
