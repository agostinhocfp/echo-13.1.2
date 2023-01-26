import { Typography } from "@mui/material";
import React from "react";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import Link from "next/link";

import styles from "./NewsCard2.module.css";

const NewsCard2 = ({ story }) => {
  return (
    <>
      <Link
        href={`/story/${story.slug.current}`}
        aria-label="To article page"
        prefetch={false}
      >
        <div className={styles.imageContainer}>
          <SanityImage
            href={story.mainImage}
            alt={`Article: ${story.title}`}
            priority={false}
            quality={70}
            width={360}
            height={260}
            style={{ objectFit: "contain" }}
            onClick={() => router.push(`/story/${story.slug.current}`)}
            onKeyDown={() => router.push(`/story/${story.slug.current}`)}
          />
        </div>
      </Link>
      <Link
        href={`/story/${story.slug.current}`}
        aria-label="To article page"
        prefetch={false}
      >
        <Typography className={styles.itemTitle} variant="h6">
          {story.title}
        </Typography>
      </Link>
    </>
  );
};

export default NewsCard2;
