import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { client, urlFor } from "../../../sanity_client/config/client";
import styles from "./LatestNews.module.css";
import Loader from "../../nano/Loader/Loader";
import Message from "../../molecules/Message/Message";
import SectionCreator from "../../molecules/SectionCreator/SectionCreator";
import SectionLayout from "../../layouts/SectionLayout/SectionLayout";
import { useRouter } from "next/router";

import Link from "next/link";
import getData from "../../../util/hooks/GetData";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import NewsCard2 from "../../molecules/NewsCard2/NewsCard2";

const LatestNews = () => {
  const router = useRouter();

  let stat = { hidden: { opacity: 0 }, show: { opacity: 1 } };

  useEffect(() => {
    try {
      QueryClient.prefetchQuery(["latestNews"], () => fetchLatestNews());
    } catch (error) {}
  }, []);

  const { data, isError, error, isLoading } = useQuery(
    ["latestNews"],
    () => fetchLatestNews(),
    {
      cacheTime: 300000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <Message severity={"error"} alertTitle="Oops, something went wrong">
        {error.toString()}
      </Message>
    );
  }

  const renderData = (data) => {
    if (data === null) return;
    return (
      <>
        {data != null ? (
          <>
            <Grid container className={styles.itemList}>
              {data.map((story) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className={styles.listItem}
                  key={story._id}
                >
                  <NewsCard2 story={story} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : null}
      </>
    );
  };

  return (
    <>
      <SectionLayout>
        <SectionCreator title="Recentes" justifyTitle="left">
          {renderData(data)}
        </SectionCreator>
      </SectionLayout>
    </>
  );
};

export default LatestNews;

const latestNewsQuery = `*[editorApproved] | order(_createdAt asc)[0...4] {_id, _createdAt, title, mainImage, slug, frontPage, landingPage}`;

const fetchLatestNews = async () => {
  try {
    const response = await client.fetch(latestNewsQuery);
    return response;
  } catch (error) {}
};
