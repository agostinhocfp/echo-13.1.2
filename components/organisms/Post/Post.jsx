import React, { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import { Grid, Typography } from "@mui/material";
import Disqus from "../Disqus/Disqus";

import styles from "./Post.module.css";
import Radar from "../../sections/Radar/Radar";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import useWindowSize from "../../../util/hooks/useWindowSize";
import { formatDate } from "../../../util/formatDate";
import Message from "../../molecules/Message/Message";
import DateFormatterDF from "../../../util/DateFormatterDF";

const components = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

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

  // console.log(post);

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
                    imageRef={currentPost.mainImage}
                    alt={currentPost.title}
                    priority={true}
                    // onClick={handleClick}
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
                    <PortableText
                      value={currentPost.body}
                      components={components}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} className={styles.radarContainer}>
                {domLoaded === true ? <Radar post={post} /> : null}
                {/* <Radar post={post} /> */}
              </Grid>
            </Grid>

            <div className={styles.commentsSection}>
              <Disqus />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Post;
