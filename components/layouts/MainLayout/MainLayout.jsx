import React from "react";
import Head from "next/head";
import { Box, CssBaseline } from "@mui/material";

import styles from "./MainLayout.module.css";
import Navbar from "../../organisms/Navbar/Navbar";
import Footer from "../../organisms/Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <Box className={styles.root}>
      <Head>
        <title>Echo</title>
        <meta
          name="description"
          content="Website de noticias de Angola para o Mundo."
        />
      </Head>
      <header>
        <Navbar />
      </header>

      <main className={styles.mainContainer}>
        <CssBaseline />
        {children}
      </main>

      <footer className={styles.footerContainer}>
        <Footer />
      </footer>
    </Box>
  );
};

export default MainLayout;
