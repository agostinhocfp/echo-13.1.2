import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box } from "@mui/material";

import Loader from "../../components/nano/Loader/Loader";
import Message from "../../components/molecules/Message/Message";
import GetData from "./GetData";
import styles from "./PrefetchQuery.module.css";

const PrefetchQuery = (query, queryName) => {
  const queryClient = useQueryClient();

  const postsQuery = query;

  useEffect(() => {
    try {
      queryClient.prefetchQuery([queryName], () => GetData(postsQuery));
    } catch (error) {
      return res
        .status(400)
        .json({ code: "oops", message: "there was an error" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isError, error, isLoading } = useQuery(
    [queryName],
    () => GetData(postsQuery),
    { keepPreviousData: true }
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
};

export default PrefetchQuery;
