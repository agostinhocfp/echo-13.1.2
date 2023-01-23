import React, { useEffect, useState } from "react";

import styles from "./SmallScreenNewsSlider.module.css";
import Carousel from "../../molecules/carousel/Carousel";
import Link from "next/link";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import { Typography } from "@mui/material";
import useWindowSize from "../../../util/hooks/useWindowSize";

const SmallScreenNewsSlider = ({ newsArr, announcePost }) => {
  const [visibleSlides, setVisibleSlides] = useState(1);

  const width = useWindowSize();

  useEffect(() => {
    if (width < 550) setVisibleSlides(1);
    else if (width <= 1024) setVisibleSlides(2);
    else if (width <= 1400) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  return (
    <div className={styles.root}>
      <Carousel
        className={styles.root}
        totalSlides={4}
        visibleSlides={visibleSlides}
        isPlaying
        interval="100"
      >
        <div className={styles.list}>
          {newsArr.map((story) => (
            <div className={styles.itemContainer} key={story._id} alt="">
              <div className={story.itemImageContainer}>
                <Link
                  href={`/story/${story.slug.current}`}
                  aria-label="Link to article page"
                >
                  <SanityImage
                    className={styles.itemImage}
                    alt={`Article: ${story.title}`}
                    href={story.mainImage}
                    width={450}
                    height={450}
                  />
                </Link>
              </div>
              <div className={styles.itemContent}>
                {story.tags && (
                  <Typography className={styles.itemTag} variant="h6">
                    {story.tags[0].titlePT}
                  </Typography>
                )}
                <Link
                  href={`/story/${story.slug.current}`}
                  aria-label="Text link to article page"
                >
                  <Typography className={styles.itemTitle} variant="h5">
                    {story.title}
                  </Typography>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default SmallScreenNewsSlider;
