import React, { useContext, useState, useEffect } from "react";
import {
  Accordion,
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Popper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { FaSearch as SearchIcon } from "react-icons/fa";

import RouteTabContext from "../../../contexts/RouteTabContext";
import MAIN_ROUTES from "../../../constants/ROUTES";
import theme from "../../../ui/theme";
import styles from "./Navbar.module.css";
import useWindowSize from "../../../util/hooks/useWindowSize";
import { SlMenu } from "react-icons/sl";
import Drawer from "../Drawer/Drawer";
import Link from "next/link";

export default function Navbar() {
  const value = useContext(RouteTabContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { selectedIndex } = value;

  const width = useWindowSize();

  const handleClick = (e, popoverId) => {
    setAnchorEl(e.target);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(<div />);
    setOpenMenu(false);
    setOpenedPopoverId(null);
  };

  // const handleMenuItemClick = (e, i) => {
  //   setAnchorEl(<div />);
  //   setOpenMenu(false);
  //   value.onCurrentIndexChange(i);
  // };

  const mouseOver = (e) => handleClick(e);

  return (
    <AppBar className={styles.root} elevation={1}>
      <div className={styles.navbarContainer}>
        <Toolbar disableGutters>
          <Grid container className={styles.rootGridContainer}>
            {/* Empty Grid */}
            <Grid item xs={3} md={3} className={styles.leftGridContainer}>
              <Drawer />
            </Grid>

            {/* Logo  */}
            <Grid item xs={6} md={6}>
              <Link href="/" aria-label="To article home page">
                <div className={styles.logoContainer}>
                  <Typography
                    className={styles.navbarLogoText}
                    variant={width > 900 ? "h3" : "h4"}
                  >
                    echo
                  </Typography>
                </div>
              </Link>
            </Grid>

            {/* Action Buttons Container */}
            <Grid
              item
              xs={3}
              md={3}
              className={styles.actionButtonsGridContainer}
            >
              <div className={styles.actionButtonsContainer}>
                <Stack direction="row" aria-label="Button Tabs">
                  {/* <Button className={styles.buttonSubscribe} href="/subscribe">
                    <Typography
                      className={`${styles.actionButtonText} ${styles.buttonSubscribeText}`}
                    >
                      Subscribe
                    </Typography>
                  </Button> */}

                  <Link href="/search">
                    <button className={styles.searchIconContainer}>
                      <SearchIcon
                        aria-label="search button"
                        className={styles.searchIcon}
                      />
                    </button>
                  </Link>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Toolbar>

        <Box
          className={styles.routesMenuContainer}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            maxWidth: {
              xs: 320,
              sm: 480,
              ms: 480,
              md: 600,
              lg: 800,
              xl: 1200,
            },
            [theme.breakpoints.down("md")]: {
              display: "none !important",
            },
          }}
        >
          <Tabs
            className={styles.tabs}
            variant="scrollable"
            scrollButtons="auto"
            value={selectedIndex == null ? false : selectedIndex}
          >
            {MAIN_ROUTES.slice(0, 6).map((route) => (
              <Tab
                className={styles.tab}
                key={route.index}
                label={route.titlePT}
                href={route.link}
                aria-label="To article page"
                value={route.index}
                onClick={() =>
                  value.onCurrentIndexChange({ selectedIndex: route.index })
                }
                onMouseOver={mouseOver}
                onMouseLeave={() => setOpenMenu(false)}
              />
            ))}
          </Tabs>
        </Box>
      </div>
    </AppBar>
  );
}
