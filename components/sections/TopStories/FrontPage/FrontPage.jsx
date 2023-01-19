import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
// import Image from "next/future/image";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
// import PQueue from "p-queue";
// import { v4 as uuidv4, v4 } from "uuid";

import styles from "./FrontPage.module.css";
import GetImageProps from "../../../../util/hooks/GetImageProps";
import useWindowSize from "../../../../util/hooks/useWindowSize.js";
import theme from "../../../../ui/theme";
import { formatDate } from "../../../../util/formatDate";
import SectionLayout from "../../../layouts/SectionLayout";
import ActiveLink from "../../../../hooks/ActiveLink/ActiveLink";
import SanityImage from "../../../../hooks/SanityImage/SanityImage";

const FrontPage = ({ newsData }) => {
  const router = useRouter();
  const width = useWindowSize();

  let stat = { hidden: { opacity: 0 }, show: { opacity: 1 } };

  // const frontPageItem = newsData.filter((item) => item.frontPage == true)[1];

  const renderLeftContent = (item) => {
    return (
      <>
        <Link href={`/story/${item.slug.current}`} aria-label="To article page">
          <Box
            className={styles.leftImageContainer}
            sx={{
              display: "flex",
              [theme.breakpoints.down("md")]: { justifyContent: "center" },
            }}
          >
            <SanityImage
              className={styles.leftImage}
              imageRef={item.mainImage}
              alt={`Article ${item.title}`}
              width={500}
              height={450}
              quality={50}
              priority={true}
              onClick={() => router.push(`/story/${item.slug.current}`)}
            />

            <div className={styles.leftCategoryContainer}>
              <Typography variant="body1" className={styles.leftCategory}>
                <span className={styles.leftCategorySpan}>
                  {item.categories[0].titlePT}
                </span>
              </Typography>
            </div>
          </Box>
        </Link>
        <Link href={`/story/${item.slug.current}`} aria-label="To article page">
          {/* <a> */}
          <Typography variant="h4" className={styles.leftTitle}>
            {item.title}
          </Typography>
          {/* </a> */}
        </Link>
        <div className={styles.leftSubtitleContainer}>
          <Typography variant="body2" className={styles.leftSubtitle}>
            {item.subtitle}
          </Typography>
        </div>
        <div className={styles.leftAuthorContainer}>
          <Typography variant="body2" className={styles.leftAuthor}>
            By {item.author.name} |{" "}
            {formatDate(item._createdAt).toLocaleDateString("pt-pt")}
          </Typography>
        </div>
      </>
    );
  };

  return (
    <SectionLayout>
      <motion.div whileInView={{ opacity: [0, 1] }}>
        <Grid container className={styles.root}>
          {/* Left Grid */}
          <Grid
            item
            xs={12}
            // sm={12}
            // lg={6}
            md={6}
            className={styles.leftContent}
          >
            {/* {frontPageItem ? <>{renderLeftContent(frontPageItem)}</> : null} */}
            <>{renderLeftContent(newsData[0])}</>
          </Grid>

          {/* Right Grid*/}
          <Grid
            item
            container
            xs={12}
            md={6}
            className={styles.rightContent}
            sx={{
              display: "flex",
              alignContent: width < 600 ? "center" : null,
              width: width < 600 ? "100%" : null,
            }}
          >
            <Grid
              className={styles.rightFeaturedContainer}
              item
              container
              xs={12}
              md={6}
              sx={{
                maxWidth: width < 600 ? "100%" : null,
              }}
            >
              {newsData
                .filter((item) => item.frontPage !== true)
                .slice(1, 3)
                .map((item) => (
                  <Grid
                    item
                    xs={6}
                    md={12}
                    className={styles.rightFeaturedItem}
                    key={item._id}
                  >
                    <div className={styles.featuredImageContainer}>
                      <ActiveLink
                        href={`/story/${item.slug.current}`}
                        aria-label="To article page"
                      >
                        <SanityImage
                          className={styles.featuredImage}
                          alt={`Image for article: ${item.title}`}
                          imageRef={item.mainImage}
                          width={300}
                          height={220}
                          quality={50}
                          priority={true}
                        />
                      </ActiveLink>
                    </div>
                    <div className={styles.featuredTitleContainer}>
                      <Link
                        href={`/story/${item.slug.current}`}
                        aria-label="To article page"
                      >
                        <Typography
                          variant="h7"
                          className={styles.featuredTitle}
                        >
                          {item.title}
                        </Typography>
                      </Link>
                    </div>
                    <Typography
                      variant="body2"
                      className={styles.featuredAuthor}
                    >
                      By {item.author.name} |{" "}
                      {formatDate(item._createdAt).toLocaleDateString("pt-pt")}
                    </Typography>
                  </Grid>
                ))}
            </Grid>

            {/* Right Side */}
            <Grid
              item
              container
              xs={12}
              md={6}
              className={styles.rightFeaturedGrid}
            >
              {newsData
                .filter((item) => item.landingPage !== true)
                .slice(4, 12)
                .map((item) => (
                  <Grid
                    item
                    xs={6}
                    md={12}
                    className={styles.rightItemContainer}
                    key={item._id}
                  >
                    <div className={styles.rightCategoryContainer}>
                      <Typography
                        variant="caption"
                        className={styles.rightCategory}
                      >
                        {item.categories[0].titlePT}
                      </Typography>
                    </div>
                    <Link
                      href={`/story/${item.slug.current}`}
                      aria-label="To article page"
                    >
                      {/* <a> */}
                      <Typography variant="h7" className={styles.rightTitle}>
                        {item.title}
                      </Typography>
                      {/* </a> */}
                    </Link>
                    <div className={styles.rightAuthorContainer}>
                      <Typography
                        variant="body2"
                        className={styles.rightAuthor}
                      >
                        By {item.author.name} |{" "}
                        {formatDate(item._createdAt).toLocaleDateString(
                          "pt-pt"
                        )}{" "}
                      </Typography>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </motion.div>
    </SectionLayout>
  );
};

export default FrontPage;
