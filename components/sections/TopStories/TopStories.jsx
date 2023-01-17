import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { client } from "../../../sanity_client/config/client";
import styles from "./TopStories.module.css";
import Loader from "../../nano/Loader/Loader";
import Message from "../../molecules/Message/Message";
import FrontPage from "./FrontPage/FrontPage";

// const sanityPostQuery =
//   "*[editorApproved ]{_id, mainImage, title, author->{name}, tags[]->}";

const sanityPostQuery =
  "*[editorApproved]{_id, mainImage, title, subtitle, slug, frontPage, landingPage, author->{name}, _createdAt, categories[]->, tags[]->}";

async function fetchPosts() {
  const response = await client.fetch(sanityPostQuery);
  return response;
}

const TopStories = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    try {
      queryClient.prefetchQuery(["topStories"], () => fetchPosts());
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isError, error, isLoading } = useQuery(
    ["topStories"],
    () => fetchPosts(),
    { keepPreviousData: true, refetchOnWindowFocus: false, staleTime: 300000 }
  );

  if (isLoading)
    return (
      <Box className={`${styles.loaderContainer} ${styles.status}`}>
        <Loader className={styles.loader} />
      </Box>
    );
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
      <FrontPage newsData={data} />
    </>
  );
};

export default TopStories;
