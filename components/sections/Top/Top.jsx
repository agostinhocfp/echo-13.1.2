import { Grid, Typography } from "@mui/material";
import React from "react";

import useWindowSize from "../../../util/hooks/useWindowSize";
import SectionLayout from "../../layouts/SectionLayout";
import styles from "./Top.module.css";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import Link from "next/link";

const Top = ({ posts }) => {
  const width = useWindowSize();

  const topPosts = posts.filter(
    (item) => item.landingPage !== true && item.frontPage === true
  );

  const announcePost = posts.filter(
    (item) => item._id === "aaf43895-9e67-41f7-b92c-656ecc1e3139"
  );

  const render1200PlusContent = () => {
    return (
      <>
        <Grid container spacing={0.25} className={styles.root}>
          {/* Left side content */}
          <Grid item xs={6} className={styles.leftGridContainer}>
            {/* Top left item */}
            <div className={styles.topLeftContainer}>
              <div className={styles.topLeftImageContainer}>
                <Link href={`/story/${topPosts[0].slug.current}`}>
                  <SanityImage
                    className={styles.topLeftImage}
                    href={topPosts[0].mainImage}
                    width={320}
                    height={377}
                  />
                </Link>
              </div>
              <div className={styles.topLeftHeader}>
                {topPosts[0].tags && (
                  <Typography className={styles.topLeftTag} variant="h6">
                    {topPosts[0].tags[0].titlePT}
                  </Typography>
                )}
                <Link href={`/story/${topPosts[0].slug.current}`}>
                  <Typography className={styles.topLeftTitle} variant="h4">
                    {topPosts[0].title}
                  </Typography>
                </Link>
              </div>
            </div>

            {/* Bottom left item */}
            <div className={styles.bottomLeftContainer}>
              <SanityImage
                className={styles.bottomLeftImage}
                href={announcePost[0].mainImage}
                width={320}
                height={250}
                fit={"contain"}
              />
              <div className={styles.bottomLeftContent}>
                <Typography className={styles.bottomLeftTitle} variant="h4">
                  {announcePost[0].title}
                </Typography>

                <Typography className={styles.bottomLeftSubtitle} variant="h6">
                  {announcePost[0].subtitle}
                </Typography>
              </div>
              <button className={styles.bottomLeftButton}>Sign up</button>
            </div>
          </Grid>

          {/* Right side content */}
          <Grid item xs={6} className={styles.rightGridContainer}>
            <Grid container className={styles.topRightContainer}>
              {topPosts.slice(1, 3).map((item) => (
                <Grid
                  className={styles.topRightItemContainer}
                  item
                  xs={6}
                  key={item._id}
                >
                  <div className={styles.topRightImageContainer}>
                    <Link href={`/story/${item.slug.current}`}>
                      <SanityImage
                        className={styles.topRightImage}
                        href={item.mainImage}
                        width={320}
                        height={250}
                      />
                    </Link>
                  </div>
                  <div className={styles.topRightHeader}>
                    {item.tags && (
                      <Typography className={styles.topRightTag} variant="h6">
                        {item.tags[0].titlePT}
                      </Typography>
                    )}
                    <Link href={`/story/${item.slug.current}`}>
                      <Typography className={styles.topRightTitle} variant="h5">
                        {item.title}
                      </Typography>
                    </Link>
                  </div>
                </Grid>
              ))}
            </Grid>
            <div className={styles.bottomRightContainer}>
              <div className={styles.bottomRightImageContainer}>
                <Link href={`/story/${topPosts[3].slug.current}`}>
                  <SanityImage
                    className={styles.bottomRightImage}
                    href={topPosts[3].mainImage}
                    width={320}
                    height={377}
                  />
                </Link>
                <div className={styles.bottomRightHeader}>
                  {topPosts[3].tags && (
                    <Typography className={styles.bottomRightTag} variant="h6">
                      {topPosts[3].tags[0].titlePT}
                    </Typography>
                  )}
                  <Link href={`/story/${topPosts[3].slug.current}`}>
                    <Typography
                      className={styles.bottomRightTitle}
                      variant="h4"
                    >
                      {topPosts[3].title}
                    </Typography>
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        ;
      </>
    );
  };

  return (
    <SectionLayout>
      {width > 1200 ? (
        <>{render1200PlusContent()}</>
      ) : width > 900 ? (
        <></>
      ) : (
        <></>
      )}
    </SectionLayout>
  );
};

export default Top;
