import React from "react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

import { client } from "../../sanity_client/config/client";
import styles from "./SanityImage.module.css";

export default function SanityImage({
  imageRef,
  alt,
  priority,
  placeholder,
  objectFit,
  height,
  width,
  quality,
  style,
  sizes,
  options,
}) {
  const imageProps = useNextSanityImage(client, imageRef);

  return (
    <Image
      {...imageProps}
      alt={alt}
      className={styles.image}
      style={style}
      quality={quality}
      width={width}
      height={height}
      priority={priority ? true : false}
      placeholder="blur"
      blurDataURL={`${imageRef}?auto=format,compress&q=1&blur=500&w=2`}
      // placeholder="blur"
      sizes={sizes}
      {...options}
    />
  );
}
