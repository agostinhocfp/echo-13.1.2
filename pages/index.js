import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import Hero9 from "../components/sections/Hero9/Hero9";
const MostPopular = dynamic(() =>
  import("../components/sections/MostPopular/MostPopular")
);
const TopStories = dynamic(() =>
  import("../components/sections/TopStories/TopStories")
);
const LatestNews = dynamic(() =>
  import("../components/sections/LatestNews/LatestNews")
);
const MoreStories = dynamic(() =>
  import("../components/sections/MoreStories/MoreStories")
);
import styles from "../styles/Home.module.css";
import Loader from "../components/nano/Loader/Loader";

const Home = () => {
  return (
    <div className={styles.container}>
      <Hero9 />
      <Suspense fallback={<Loader />}>
        <MostPopular />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <TopStories />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <LatestNews />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <MoreStories />
      </Suspense>
    </div>
  );
};

export default Home;
