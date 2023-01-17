import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Link from "next/link";

import ActiveLink from "../../../hooks/ActiveLink/ActiveLink";
import styles from "./Radar.module.css";
import getData from "../../../util/hooks/GetData";
import Loader from "../../nano/Loader/Loader";
import Message from "../../molecules/Message/Message";

const Radar = ({ post }) => {
  const queryClient = new QueryClient();

  const radarQuery =
    "*[editorApproved][0...6] | order(views desc){_id, title, author->{name}, slug}";

  useEffect(() => {
    try {
      queryClient.prefetchQuery(["radar"], () => getData(radarQuery));
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isError, error, isLoading } = useQuery(
    ["radar"],
    () => getData(radarQuery),
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

  return (
    <div className={styles.root}>
      <Typography className={styles.radarTitle} variant="h5">
        Radar
      </Typography>
      <div className={styles.radarContainer}>
        {data
          .filter((item) => item.slug.current !== post?.slug.current)
          .slice(0, 6)
          .map((post, i) => (
            <div key={post._id} className={styles.radarItemContainer}>
              <ActiveLink href={`/story/${post.slug.current}`}>
                <Typography
                  className={styles.rankNumber}
                  sx={{ fontFamily: "plaster" }}
                >
                  {i + 1}
                </Typography>
                <Typography
                  className={styles.radarItemTitle}
                  variant="body1"
                  key={post._id}
                >
                  {post.title}
                </Typography>
              </ActiveLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Radar;
