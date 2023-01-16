import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { client } from "../../../sanity_client/config/client";
import styles from "./Hero9.module.css";
import Loader from "../../nano/Loader/Loader";
import Message from "../../molecules/Message/Message";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import useWindowSize from "../../../util/hooks/useWindowSize";

const sanityPostQuery =
  "*[landingPage]{_id, mainImage, title, subtitle, slug, landingPage, author->{name}, _createdAt, categories[]->, tags[]->}";

async function fetchPosts() {
  const response = await client.fetch(sanityPostQuery);
  return response;
}

const Hero9 = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const width = useWindowSize();

  useEffect(() => {
    try {
      queryClient.prefetchQuery(["hero"], () => fetchPosts());
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/story/${data[0].slug.current}`);
  };

  const { data, isError, error, isLoading } = useQuery(
    ["hero"],
    () => fetchPosts(),
    { keepPreviousData: true, refetchOnWindowFocus: false, staleTime: 300000 }
  );

  if (isLoading) {
    return (
      <Box className={`${styles.loaderContainer} ${styles.status}`}>
        <Loader className={styles.loader} />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box className={styles.messageContainer}>
        <Message
          className={`${styles.alertMessage} ${styles.status}`}
          severity={"error"}
          alertTitle="Oops, something went wrong"
        >
          {error.toString()}
        </Message>
      </Box>
    );
  }

  return (
    <>
      {data != null ? (
        <div className={styles.root}>
          <SanityImage
            className={styles.image}
            alt={`Landing page image of article: ${data[0].title}`}
            imageRef={data[0]?.mainImage}
            priority={true}
            random="random"
            blue={true}
          />

          <div className={styles.contentContainer} onClick={handleClick}>
            <Typography
              variant={width > 1200 ? "h2" : "h3"}
              className={styles.headline}
            >
              {data[0].title}
            </Typography>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Hero9;