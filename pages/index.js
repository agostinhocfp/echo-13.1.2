import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import Hero9 from "../components/sections/Hero9/Hero9";
const TopStories = dynamic(() =>
  import("../components/sections/TopStories/TopStories")
);
const MostPopular = dynamic(() =>
  import("../components/sections/MostPopular/MostPopular")
);
const LatestNews = dynamic(() =>
  import("../components/sections/LatestNews/LatestNews")
);
import styles from "../styles/Home.module.css";
import MoreStories from "../components/sections/MoreStories/MoreStories";
import Loader from "../components/nano/Loader/Loader";

const Home = () => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader />}>
        <Hero9 />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <MostPopular />
        <TopStories />
        <LatestNews />
        <MoreStories />
      </Suspense>
    </div>
  );
};

export default Home;
