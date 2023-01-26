import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Typography } from "@mui/material";

import styles from "./NewsCard1.module.css";
// import { ErrorBoundary } from "react-error-boundary";
// import Error from "next/error";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import useWindowSize from "../../../util/hooks/useWindowSize";
import DateFormatterDF from "../../../util/DateFormatterDF";

const NewsCard1 = ({ post }) => {
  const router = useRouter();

  const width = useWindowSize();

  if (!post) {
    return null;
  }

  return (
    <>
      {/* <ErrorBoundary
        fallback={<Error title="We're sorry. Could not fetch data."></Error>}
      > */}
      {post && (
        <div className={styles.postContainer} key={post._id}>
          <div className={styles.postImageContainer}>
            <SanityImage
              className={styles.postImage}
              href={post.mainImage}
              alt={`Article: ${post.title}`}
              height={180}
              width={400}
              priority={false}
              quality={70}
              onClick={() => router.push(`/story/${currentPost.slug.current}`)}
            />
          </div>
          <div className={styles.postInfoContainer}>
            {/* <Typography
                className={styles.postTag}
                variant="caption"
                sx={{ fontFamily: "plaster" }}
              >
                {post.tags[0]?.title}
              </Typography> */}
            <Link
              href={`/story/${post.slug.current}`}
              aria-label="To article page"
            >
              <Typography
                className={styles.postTitle}
                variant={width > 900 ? "h4" : "body1"}
              >
                {post.title}
              </Typography>
            </Link>
            <Typography className={styles.postAuthor} variant="body1">
              {post.author?.name} &#8226;
              {DateFormatterDF(post._createdAt)}
            </Typography>
          </div>
        </div>
      )}
      {/* </ErrorBoundary> */}
    </>
  );
};

export default NewsCard1;
