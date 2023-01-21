import { Grid, Typography } from "@mui/material";
import Reac from "react";

import useWindowSize from "../../../util/hooks/useWindowSize";
import SectionLayout from "../../layouts/SectionLayout/SectionLayout";
import styles from "./Top.module.css";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import Link from "next/link";
import MidScreenNewsGrid from "../../layouts/MidScreenNewsGrid/MidScreenNewsGrid";
import SmallScreenNewsSlider from "../../layouts/MainLayout/SmallScreenNewsSlider/SmallScreenNewsSlider";

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
        <Grid container spacing={0.25} className={styles.bigRoot}>
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
                  <Typography className={styles.topLeftTitle} variant="h5">
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
                      <Typography className={styles.topRightTitle} variant="h6">
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
              </div>
              <div className={styles.bottomRightHeader}>
                {topPosts[3].tags && (
                  <Typography className={styles.bottomRightTag} variant="h6">
                    {topPosts[3].tags[0].titlePT}
                  </Typography>
                )}
                <Link href={`/story/${topPosts[3].slug.current}`}>
                  <Typography className={styles.bottomRightTitle} variant="h6">
                    {topPosts[3].title}
                  </Typography>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <SectionLayout className={styles.root}>
      {width > 1024 ? (
        <>{render1200PlusContent()}</>
      ) : width > 768 ? (
        // <div className={styles.midRoot}>
        //   {/* top content */}
        //   <div className={styles.topContainer}>
        //     <div className={styles.topImageContainer}>
        //       <Link href={`/story/${topPosts[0].slug.current}`}>
        //         <SanityImage
        //           className={styles.topImage}
        //           href={topPosts[0].mainImage}
        //           width={1000}
        //           height={400}
        //         />
        //       </Link>
        //     </div>
        //     <div className={styles.topContent}>
        //       {topPosts[0].tags && (
        //         <Typography className={styles.topTag} variant="h6">
        //           {topPosts[0].tags[0].titlePT}
        //         </Typography>
        //       )}
        //       <Link href={`/story/${topPosts[0].slug.current}`}>
        //         <Typography
        //           className={styles.topTitle}
        //           variant={width > 1200 ? "h4" : width > 900 ? "h5" : "h6"}
        //         >
        //           {topPosts[0].title}
        //         </Typography>
        //       </Link>
        //     </div>
        //   </div>

        //   {/* mid content */}
        //   <Grid container className={styles.midContainer}>
        //     {/* mid left content*/}
        //     <Grid className={styles.midLeftContainer} item xs={8}>
        //       <div className={styles.midLeftImageContainer}>
        //         <Link href={`/story/${topPosts[1].slug.current}`}>
        //           <SanityImage
        //             className={styles.midLeftImage}
        //             href={topPosts[1].mainImage}
        //             width={640}
        //             height={200}
        //           />
        //         </Link>
        //       </div>
        //       <div className={styles.midLeftContent}>
        //         {topPosts[1].tags && (
        //           <Typography className={styles.midLeftTag} variant="h6">
        //             {topPosts[1].tags[1].titlePT}
        //           </Typography>
        //         )}
        //         <Link href={`/story/${topPosts[1].slug.current}`}>
        //           <Typography className={styles.midLeftTitle} variant="h6">
        //             {topPosts[1].title}
        //           </Typography>
        //         </Link>
        //       </div>
        //     </Grid>

        //     {/* mid right content */}
        //     <Grid className={styles.midRightContainer} item xs={4}>
        //       <div className={styles.midRightImageContainer}>
        //         <Link href={`/story/${topPosts[2].slug.current}`}>
        //           <SanityImage
        //             className={styles.midRightImage}
        //             href={topPosts[2].mainImage}
        //             width={320}
        //             height={200}
        //           />
        //         </Link>
        //       </div>
        //       <div className={styles.midRightContent}>
        //         {topPosts[2].tags && (
        //           <Typography className={styles.midRightTag} variant="h6">
        //             {topPosts[2].tags != null
        //               ? topPosts[2].tags[0].titlePT
        //               : null}
        //           </Typography>
        //         )}
        //         <Link href={`/story/${topPosts[2].slug.current}`}>
        //           <Typography className={styles.midRightTitle} variant="h6  ">
        //             {topPosts[2].title}
        //           </Typography>
        //         </Link>
        //       </div>
        //     </Grid>
        //   </Grid>

        //   <Grid container className={styles.bottomContainer}>
        //     {/* bottom left */}
        //     <Grid className={styles.midScreenBottomLeftContainer} item xs={4}>
        //       <div className={styles.midScreenBottomLeftImageContainer}>
        //         <Link href={`/story/${topPosts[3].slug.current}`}>
        //           <SanityImage
        //             className={styles.midScreenBottomLeftImage}
        //             href={topPosts[3].mainImage}
        //             width={640}
        //             height={200}
        //           />
        //         </Link>
        //       </div>
        //       <div className={styles.midScreenBottomLeftContent}>
        //         {topPosts[3].tags && (
        //           <Typography
        //             className={styles.midScreenBottomLeftTag}
        //             variant="h6"
        //           >
        //             {topPosts[3].tags[0].titlePT}
        //           </Typography>
        //         )}
        //         <Link href={`/story/${topPosts[3].slug.current}`}>
        //           <Typography
        //             className={styles.midScreenBottomLeftTitle}
        //             variant="h6"
        //           >
        //             {topPosts[3].title}
        //           </Typography>
        //         </Link>
        //       </div>
        //     </Grid>

        //     {/* bottom right content */}
        //     <Grid className={styles.midScreenBottomRightContainer} item xs={8}>
        //       <div className={styles.midScreenBottomRightImageContainer}>
        //         <Link href={`/story/${topPosts[3].slug.current}`}>
        //           <SanityImage
        //             className={styles.midScreenBottomRightImage}
        //             href={topPosts[3].mainImage}
        //             width={320}
        //             height={200}
        //           />
        //         </Link>
        //       </div>
        //       <div className={styles.midScreenBottomRightContent}>
        //         {topPosts[3].tags && (
        //           <Typography
        //             className={styles.midScreenBottomRightTag}
        //             variant="h6"
        //           >
        //             {topPosts[3].tags != null
        //               ? topPosts[3].tags[0].titlePT
        //               : null}
        //           </Typography>
        //         )}
        //         <Link href={`/story/${topPosts[3].slug.current}`}>
        //           <Typography
        //             className={styles.midScreenBottomRightTitle}
        //             variant="h6  "
        //           >
        //             {topPosts[3].title}
        //           </Typography>
        //         </Link>
        //       </div>
        //     </Grid>
        //   </Grid>
        // </div>

        <>
          <MidScreenNewsGrid
            newsArr={topPosts}
            announcePost={announcePost[0]}
          />
        </>
      ) : (
        <>
          <SmallScreenNewsSlider
            newsArr={topPosts}
            announcePost={announcePost[0]}
          />
        </>
      )}
    </SectionLayout>
  );
};

export default Top;
