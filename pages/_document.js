import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

import Favicon from "../public/favicon/Favicon";
import Footer from "../components/Footer/Footer";

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fasthand&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plaster&display=swap"
          rel="stylesheet"
        />
        <Favicon />
      </Head>
      <body>
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
