import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./Story.module.css";
import getData from "../../util/hooks/GetData";
import Message from "../../components/molecules/Message/Message";
import SectionLayout from "../../components/layouts/SectionLayout/SectionLayout";
import Post from "../../components/organisms/Post/Post";
import Loader from "../../components/nano/Loader/Loader";

export default function Story(props) {
  const [post, setPost] = useState(null);

  const queryClient = useQueryClient();

  const { sanityPostQuery } = props;

  const { data, isError, error, isLoading } = useQuery(
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
  }, [data, sanityPostQuery, queryClient]);

  if (isLoading) {
    return (
      <div className={`${styles.loaderContainer} ${styles.status}`}>
        <Loader className={styles.loader} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.messageContainer}>
        <Message
          className={`${styles.alertMessage} ${styles.status}`}
          severity={"error"}
          alertTitle="Oops, Ocorreu um erro."
        >
          Não podemos mostrar este conteúdo. Pedimos as nossas sinceras
          desculpas.
        </Message>
      </div>
    );
  }

  // incVisits(post._id);

  return (
    <SectionLayout>
      <div className={styles.root}>
        {post != null ? <Post post={post} id={post._id} /> : null}
      </div>
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
