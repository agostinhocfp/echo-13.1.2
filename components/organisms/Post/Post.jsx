import React, { lazy, useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const Disqus = dynamic(() => import("../Disqus/Disqus"));
const Radar = dynamic(() => import("../../sections/Radar/Radar"));
import styles from "./Post.module.css";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import useWindowSize from "../../../util/hooks/useWindowSize";
import DateFormatterDF from "../../../util/DateFormatterDF";
import EchoPortableText from "../../molecules/usePortableText/EchoPortableText";

const Post = ({ post }) => {
  const [currentPost, setCurrentPost] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false);

  const width = useWindowSize();

  useEffect(() => {
    if (post) {
      setCurrentPost(post);
    }
    setDomLoaded(true);
  }, [post]);

  return (
    <>
      {currentPost != null ? (
        <>
          <div className={styles.postContainer}>
            <div className={styles.postInfoSection}>
              <Typography
                className={styles.title}
                variant={width < 900 ? "h4" : "h3"}
              >
                {currentPost.title}
              </Typography>
              <Typography className={styles.subtitle} variant="caption">
                {currentPost.subtitle}
              </Typography>
              <br />
              <Typography className={styles.date} variant="caption">
                {DateFormatterDF(currentPost._createdAt)}
              </Typography>
            </div>

            <Grid container>
              <Grid
                className={styles.postBodySection}
                item
                container
                xs={12}
                md={9}
              >
                <div className={styles.imageContainer}>
                  <SanityImage
                    href={currentPost.mainImage}
                    alt={currentPost.title}
                    priority={true}
                    width={900}
                    height={420}
                    onClick={() =>
                      router.push(`/news/${currentPost.slug.current}`)
                    }
                    onKeyDown={() =>
                      router.push(`/news/${currentPost.slug.current}`)
                    }
                  />
                </div>

                <Grid className={styles.socialsContainer} item xs={12} md={3}>
                  <Typography
                    className={styles.subsectionTitle}
                    variant="h6"
                    sx={{ fontFamily: "plaster" }}
                  >
                    Autor
                  </Typography>
                  <Typography className={styles.author} variant="h7">
                    {currentPost.author?.name}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={9}>
                  <div className={styles.mainContent}>
                    <EchoPortableText value={currentPost.body} />
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12} md={3} className={styles.radarContainer}>
                {domLoaded === true ? <Radar post={post} /> : null}
              </Grid>
            </Grid>

            {domLoaded && (
              <div className={styles.commentsSection}>
                <Disqus />
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Post;
