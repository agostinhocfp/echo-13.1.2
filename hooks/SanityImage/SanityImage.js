import React from "react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

import { client } from "../../sanity_client/config/client";
import styles from "./SanityImage.module.css";

export default function SanityImage({
  href,
  alt,
  priority,
  fit,
  height,
  width,
  quality,
  sizes,
  options,
}) {
  const imageProps = useNextSanityImage(client, href);

  return (
    <Image
      {...imageProps}
      alt={alt}
      className={styles.image}
      quality={quality}
      width={width}
      height={height}
      priority={priority}
      placeholder="blur"
      style={{ objectFit: fit != null ? fit : "cover" }}
      blurDataURL={`${href}?auto=format,compress&q=1&blur=500&w=2`}
      sizes={sizes}
    />
  );
}
