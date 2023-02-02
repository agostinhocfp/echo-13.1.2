import React, { useEffect, useState, Suspense } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";

import styles from "./Search.module.css";
import { client } from "../../sanity_client/config/client";
import Radar from "../../components/sections/Radar/Radar";
import Loader from "../../components/nano/Loader/Loader";
import NewsCard1 from "../../components/molecules/NewsCard1/NewsCard1";
import Message from "../../components/molecules/Message/Message";
import useWindowSize from "../../util/hooks/useWindowSize";
import SectionLayout from "../../components/layouts/SectionLayout/SectionLayout";
// import { ErrorBoundary } from "react-error-boundary";
// import Error from "next/error";
import Error from "../feed/error";

const Index = () => {
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const width = useWindowSize();

  const searchedPostsQuery = `*[_type == "post" && title match "${searchTerm}*" || subtitle match "${searchTerm}*" || _type == "post" && category match "${searchTerm}*" || _type == "post" && tag match "${searchTerm}*" || body[].children[].text match "${searchTerm}*"]{_id, mainImage, slug, title, editorApproved, author->{name}, _createdAt, tags[]->}`;

  async function fetchPosts() {
    const response = await client.fetch(searchedPostsQuery);
    return response;
  }

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["searchedPosts"] });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryClient = new QueryClient();

  const { data, isError, error, isLoading, isFetching, refetch } = useQuery(
    ["searchedPosts", searchedPostsQuery],
    () => fetchPosts(searchedPostsQuery),
    {
      enabled,
      staleTime: 300000,
      cacheTime: 0,
      refetchOnMount: false,
    }
  );

  if ((isLoading && isFetching) || isFetching) {
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() && keyword.length >= 2) {
      setSearchTerm(keyword);
      setSearched(true);
      setEnabled(true);
      refetch();
      queryClient.fetchQuery(["searchedPosts"], () => fetchPosts());
    }
  };

  const renderContent = () => {
    return (
      <>
        <form
          action=""
          className={styles.searchContainer}
          onSubmit={submitHandler}
        >
          <label>
            <Typography variant="body1">Procurar</Typography>
            <input
              className={styles.searchField}
              id="standard-search"
              type="search"
              onChange={(e) => setKeyword(e.target.value)}
              alt="search"
            />
          </label>

          {searched === true ? (
            <div className={styles.resultsMessageContainer}>
              <Typography
                className={styles.resultsMessage}
                variant={width > 900 ? "h4" : "h5"}
              >{`${data.length} resultado(s) para "${searchTerm}".`}</Typography>
            </div>
          ) : null}
        </form>

        {data != null ? (
          <Suspense fallback={<Loader />}>
            <div className={styles.postsContainer}>
              {data?.map((post) => (
                <NewsCard1 key={post._id} post={post} />
              ))}
            </div>
          </Suspense>
        ) : null}
      </>
    );
  };

  return (
    <SectionLayout>
      <div className={styles.root}>
        <Grid container>
          <Grid item xs={12} md={9}>
            {renderContent()}
          </Grid>
          {width > 900 ? (
            <>
              <Grid item xs={12} md={3}>
                {<Radar />}
              </Grid>
            </>
          ) : null}
        </Grid>
      </div>
    </SectionLayout>
  );
};

export default Index;
