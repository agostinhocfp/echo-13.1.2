import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Link from "next/link";

import styles from "./Radar.module.css";
import getData from "../../../util/hooks/GetData";
import Loader from "../../nano/Loader/Loader";
import Message from "../../molecules/Message/Message";

const Radar = ({ post }) => {
  const queryClient = new QueryClient();

  const radarQuery =
    "*[editorApproved][0...5] | order(views desc){_id, title, author->{name}, slug}";

  useEffect(() => {
    try {
      queryClient.prefetchQuery(["radar"], () => getData(radarQuery));
    } catch (error) {
      return res;
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
          Ocorreu um erro. Não podemos mostrar este conteúdo. Pedimos as nossas
          sinceras desculpas.
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
          .slice(0, 5)
          .map((post, i) => (
            <div key={post._id} className={styles.radarItemContainer}>
              <Link href={`/story/${post.slug.current}`}>
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
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Radar;
