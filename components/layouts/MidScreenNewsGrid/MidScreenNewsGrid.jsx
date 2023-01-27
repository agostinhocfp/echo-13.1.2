import React from "react";
import Link from "next/link";

import styles from "./MidScreenNewsGrid.module.css";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import { Grid, Typography } from "@mui/material";
import useWindowSize from "../../../util/hooks/useWindowSize";

const MidScreenNewsGrid = ({ newsArr, announcePost }) => {
  const width = useWindowSize();
  return (
    <div className={styles.root}>
      {/* top content */}
      <div className={styles.topContainer}>
        <div className={styles.topImageContainer}>
          <Link href={`/story/${newsArr[0].slug.current}`}>
            <SanityImage
              className={styles.topImage}
              href={newsArr[0].mainImage}
              alt={`Article: ${newsArr[0].title}`}
              width={1000}
              height={400}
            />
          </Link>
        </div>
        <div className={styles.topContent}>
          {newsArr[0].tags && (
            <Typography className={styles.topTag} variant="h6">
              {newsArr[0].tags[0].titlePT}
            </Typography>
          )}
          <Link href={`/story/${newsArr[0].slug.current}`}>
            <Typography
              className={styles.topTitle}
              variant={width > 1200 ? "h4" : width > 900 ? "h5" : "h6"}
            >
              {newsArr[0].title}
            </Typography>
          </Link>
        </div>
      </div>

      {/* mid content */}
      <Grid container className={styles.midContainer}>
        {/* mid left content*/}
        <Grid className={styles.midLeftContainer} item xs={8}>
          <div className={styles.midLeftImageContainer}>
            <Link href={`/story/${newsArr[1].slug.current}`}>
              <SanityImage
                className={styles.midLeftImage}
                href={newsArr[1].mainImage}
                alt={`Article: ${newsArr[1].title}`}
                width={640}
                height={200}
              />
            </Link>
          </div>
          <div className={styles.midLeftContent}>
            {newsArr[1].tags && (
              <Typography className={styles.midLeftTag} variant="h6">
                {newsArr[1].tags[0].titlePT}
              </Typography>
            )}
            <Link href={`/story/${newsArr[1].slug.current}`}>
              <Typography className={styles.midLeftTitle} variant="h6">
                {newsArr[1].title}
              </Typography>
            </Link>
          </div>
        </Grid>

        {/* mid right content */}
        <Grid className={styles.midRightContainer} item xs={4}>
          <div className={styles.midRightImageContainer}>
            <Link href={`/story/${newsArr[2].slug.current}`}>
              <SanityImage
                className={styles.midRightImage}
                href={newsArr[2].mainImage}
                alt={`Article: ${newsArr[2].title}`}
                width={320}
                height={200}
              />
            </Link>
          </div>
          <div className={styles.midRightContent}>
            {newsArr[2].tags && (
              <Typography className={styles.midRightTag} variant="h6">
                {newsArr[2].tags != null ? newsArr[2].tags[0].titlePT : null}
              </Typography>
            )}
            <Link href={`/story/${newsArr[2].slug.current}`}>
              <Typography className={styles.midRightTitle} variant="h6  ">
                {newsArr[2].title}
              </Typography>
            </Link>
          </div>
        </Grid>
      </Grid>

      <Grid container className={styles.bottomContainer}>
        {/* bottom left */}
        <Grid className={styles.bottomLeftContainer} item xs={4}>
          <div className={styles.bottomLeftImageContainer}>
            <Link href={`/story/${newsArr[3].slug.current}`}>
              <SanityImage
                className={styles.bottomLeftImage}
                href={newsArr[3].mainImage}
                alt={`Article: ${newsArr[3].title}`}
                width={640}
                height={200}
              />
            </Link>
          </div>
          <div className={styles.bottomLeftContent}>
            {newsArr[3].tags && (
              <Typography className={styles.bottomLeftTag} variant="h6">
                {newsArr[3].tags[0].titlePT}
              </Typography>
            )}
            <Link href={`/story/${newsArr[3].slug.current}`}>
              <Typography className={styles.bottomLeftTitle} variant="h6">
                {newsArr[3].title}
              </Typography>
            </Link>
          </div>
        </Grid>

        {/* bottom right content */}
        <Grid className={styles.bottomRightContainer} item xs={8}>
          <div className={styles.bottomRightImageContainer}>
            <Link href={`/story/${announcePost.slug?.current}`}>
              <SanityImage
                className={styles.bottomRightImage}
                href={announcePost.mainImage}
                alt={`Article: ${announcePost.title}`}
                width={320}
                height={200}
              />
            </Link>
          </div>
          <div className={styles.bottomRightContent}>
            {announcePost.tags && (
              <Typography className={styles.bottomRightTag} variant="h6">
                {announcePost.tags != null
                  ? announcePost.tags[0].titlePT
                  : null}
              </Typography>
            )}
            <Link href={`/story/${announcePost.slug?.current}`}>
              <Typography className={styles.bottomRightTitle} variant="h6  ">
                {announcePost.title}
              </Typography>
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MidScreenNewsGrid;
