import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { client, urlFor } from "../../../sanity_client/config/client";
import styles from "./LatestNews.module.css";
import Loader from "../../nano/Loader/Loader";
import Message from "../../molecules/Message/Message";
import SectionCreator from "../../molecules/SectionCreator/SectionCreator";
import SectionLayout from "../../layouts/SectionLayout";
import { useRouter } from "next/router";

import Link from "next/link";
import getData from "../../../util/hooks/GetData";
import SanityImage from "../../../hooks/SanityImage/SanityImage";

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
    if (data === null || undefined) return;
    return (
      <>
        {data != null ? (
          <>
            <Grid container className={styles.itemList}>
              <motion.div initial="hidden" animate="show">
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
                    <motion.div
                      variants={stat}
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.6 }}
                      className={styles.motionDiv}
                    >
                      <Link
                        href={`/story/${story.slug.current}`}
                        aria-label="To article page"
                      >
                        <div className={styles.imageContainer}>
                          <SanityImage
                            imageRef={story.mainImage}
                            alt={`Article: ${story.title}`}
                            priority={false}
                            quality={50}
                            width={360}
                            height={260}
                            onClick={() =>
                              router.push(`/news/${story.slug.current}`)
                            }
                            onKeyDown={() =>
                              router.push(`/news/${story.slug.current}`)
                            }
                          />
                        </div>
                        <Typography className={styles.itemTitle} variant="h6">
                          {story.title}
                        </Typography>
                      </Link>
                    </motion.div>
                  </Grid>
                ))}
              </motion.div>
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
