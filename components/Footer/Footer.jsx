import React, { useContext } from "react";
import { Box } from "@mui/material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import { MAIN_ROUTES } from "../../constants/ROUTES";
import RouteTabContext from "../../contexts/RouteTabContext";
import useWindowSize from "../../util/hooks/useWindowSize.js";
import styles from "./Footer.module.css";

export const Footer = () => {
  const [value, setValue] = React.useState(0);
  const routeValue = useContext(RouteTabContext);

  const { selectedIndex } = routeValue;

  const width = useWindowSize();

  return (
    <>
      {width < 900 ? (
        <>
          <Box className={styles.root}>
            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation
                value={selectedIndex == null ? false : selectedIndex}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                showLabels={false}
              >
                {MAIN_ROUTES.map((route) => (
                  <BottomNavigationAction
                    key={route.index}
                    label={route.title}
                    icon={route.icon}
                    href={route.link}
                    onClick={() =>
                      routeValue.onCurrentIndexChange({
                        selectIndex: route.index,
                      })
                    }
                  />
                ))}
              </BottomNavigation>
            </Paper>
          </Box>
        </>
      ) : null}
    </>
  );
};
