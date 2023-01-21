import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./Story.module.css";
import { Box } from "@mui/material";
import getData from "../../util/hooks/GetData";
import ModernLoader from "../../components/nano/ModernLoader/ModernLoader";
import Message from "../../components/molecules/Message/Message";
import SectionLayout from "../../components/layouts/SectionLayout/SectionLayout";
import Post from "../../components/organisms/Post/Post";

export default function Story(props) {
  const [post, setPost] = useState(null);

  const queryClient = useQueryClient();
  const { slug } = props;

  const { sanityPostQuery } = props;

  const { data, isError, error, isLoading, isFetching } = useQuery(
    {
      queryKey: ["post"],
      queryFn: () => getData(props.sanityPostQuery),
      initialData: {},
    },
    { staleTime: 300000, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    try {
      queryClient.prefetchQuery(["post"], () => getData(sanityPostQuery));
    } catch (error) {}
    if (data) {
      setPost(data[0]);
    }
  }, [setPost, sanityPostQuery, data, queryClient]);

  if (isLoading) {
    return (
      <Box className={`${styles.loaderContainer} ${styles.status}`}>
        {/* <Loader className={styles.loader} /> */}
        <ModernLoader />
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

  // incVisits(post._id);

  return (
    <SectionLayout>
      <Box className={styles.root}>
        {post != null ? <Post post={post} id={post._id} /> : null}
      </Box>
    </SectionLayout>
  );
}

export async function getServerSideProps({ query }) {
  const sanityPostQuery = `*[_type == "post" && slug.current == '${query.slug}']{_id, body, mainImage, title, subtitle, slug, author->{name}, comments[]->{_id, _createdAt, author->{name}, text, likes, dislikes}, editorApproved, _createdAt}`;

  const post = await getData(sanityPostQuery);

  return {
    props: {
      post,
      sanityPostQuery,
    },
  };
}
