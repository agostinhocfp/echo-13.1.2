import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import MAIN_ROUTES from "../constants/ROUTES";

const Context = React.createContext(null);

export const RouteTabStore = (props) => {
  const [currentIndex, setCurrentIndex] = useState({
    currentIndex: null,
  });
  const [contextLoading, setContextLoading] = useState(null);

  const router = useRouter();

  // Updates current index of routes (news sub-categories) based on current route or user interaction to a new route
  useEffect(() => {
    setContextLoading(true);
    MAIN_ROUTES.map((route) => {
      switch (window.location.pathname) {
        case "/":
          setCurrentIndex({ selectedIndex: null });
          break;
        case `${route.link}`:
          if (currentIndex !== route.index) {
            setCurrentIndex({ selectedIndex: route.index });
          }
          break;
        default:
          break;
      }
    });
    setContextLoading(false);
  }, [router.asPath]);

  const onCurrentIndexChange = (newIndex) => {
    if (currentIndex === newIndex) {
      return;
    }
    setCurrentIndex(newIndex);
  };

  return (
    <Context.Provider
      value={{
        ...currentIndex,
        onCurrentIndexChange: onCurrentIndexChange,
        contextLoading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
