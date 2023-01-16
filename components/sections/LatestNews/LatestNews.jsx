import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { client, urlFor } from "../../../sanity_client/config/client";

import styles from "./LatestNews.module.css";
import Loader from "../../nano/Loader/Loader";
import Message from "../../molecules/Message/Message";
import SectionCreator from "../../molecules/SectionCreator/SectionCreator";
import SectionLayout from "../../layouts/SectionLayout";
import { useRouter } from "next/router";

import Link from "next/link";
import getData from "../../../util/hooks/GetData";

const latestNewsQuery = `*[editorApproved][0...4] | order(_createdAt asc) {_id, _createdAt, title, mainImage, slug, frontPage, landingPage}`;

const fetchLatestNews = async () => {
  try {
    const response = await client.fetch(latestNewsQuery);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const LatestNews = () => {
  const router = useRouter();

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
    if (data === null || undefined) return;
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
                  <Link href={`/story/${story.slug.current}`}>
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.image}
                        src={urlFor(story.mainImage)}
                        alt={`Article: ${story.title}`}
                        onClick={() =>
                          router.push(`/story/${story.slug.current}`)
                        }
                        onKeyDown={() =>
                          router.push(`/story/${story.slug.current}`)
                        }
                      />
                    </div>
                    <Typography className={styles.itemTitle} variant="h6">
                      {story.title}
                    </Typography>
                  </Link>
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