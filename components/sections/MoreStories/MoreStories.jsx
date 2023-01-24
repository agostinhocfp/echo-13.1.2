import React, { useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { client } from "../../../sanity_client/config/client";

import styles from "./MoreStories.module.css";
import Loader from "../../nano/Loader/Loader";
import Message from "../../molecules/Message/Message";
import SectionCreator from "../../molecules/SectionCreator/SectionCreator";
import SectionLayout from "../../layouts/SectionLayout/SectionLayout";
import useIntersectionObserver from "../../../util/hooks/useIntersectionObserver";
import NewsCard2 from "../../molecules/NewsCard2/NewsCard2";

const MoreStories = () => {
  const loadMoreRef = useRef();

  const fetchInfinitePosts = async ({
    pageParam = { lastCreatedAt: "", lastId: "" },
  }) => {
    try {
      var response = null;

      if (pageParam.lastCreatedAt != "" || pageParam.lastId != "") {
        response = await client.fetch(
          `*[editorApproved && _type == "post" && (_createdAt < '${pageParam.lastCreatedAt}' || (_createdAt == '${pageParam.lastCreatedAt}' && _id < '${pageParam.lastId}'))] | order(_createdAt desc) [0...4] {_id, _createdAt, title, mainImage, slug, frontPage, landingPage}`,
          pageParam
        );
      } else {
        response = await client.fetch(
          `*[editorApproved && _type == "post" && _type != "announcement" && (_createdAt > '' || (_createdAt == '' && _id > ''))] | order(_createdAt desc) [0...4] {_id, _createdAt, title, mainImage, slug, frontPage, landingPage}`,
          pageParam
        );
      }

      if (response.length > 0) {
        pageParam.lastId = response[response.length - 1]._id;
        pageParam.lastCreatedAt = response[response.length - 1]._createdAt;
      } else {
        pageParam.lastId = null;
        pageParam.lastCreatedAt = null;
      }

      return response;
    } catch (error) {}
  };

  const {
    data,
    isError,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["moreStories"], fetchInfinitePosts, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 4) return undefined;
      return {
        lastId: lastPage[lastPage.length - 1]._id,
        lastCreatedAt: lastPage[lastPage.length - 1]._createdAt,
      };
    },
  });

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <Message severity={"error"} alertTitle="Oops, something went wrong">
        {error.toString()}
      </Message>
    );
  }

  const renderData = (data) => {
    // if (data == null) return;
    return (
      <>
        {data != null ? (
          <>
            <Grid container className={styles.itemList}>
              {data.pages.slice(1).map((group, i) => (
                <React.Fragment key={i}>
                  {group.map((story) => (
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
                </React.Fragment>
              ))}
            </Grid>

            <div
              ref={loadMoreRef}
              className={!hasNextPage ? styles.hidden : ""}
            >
              {isFetchingNextPage ? <Loader /> : ""}
            </div>
            <div>
              {isLoading && <Loader />}
              {!hasNextPage && !isLoading && (
                <div className={styles.loadingStatusContainer}>
                  <Typography className={styles.loadingStatus} variant="body1">
                    No more content.
                  </Typography>
                </div>
              )}
              <div>
                {isFetching && !isFetchingNextPage ? "Fetching..." : null}
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  };

  return (
    <>
      <SectionLayout>
        <SectionCreator title="Mais Notícias" justifyTitle="left">
          {renderData(data)}
        </SectionCreator>
      </SectionLayout>
    </>
  );
};

export default MoreStories;
