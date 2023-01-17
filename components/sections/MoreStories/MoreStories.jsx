import React, { useRef } from "react";
import { Grid, Typography } from "@mui/material";
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { client, urlFor } from "../../../sanity_client/config/client";

import styles from "./MoreStories.module.css";
import Loader from "../../nano/Loader/Loader";
import Message from "../../molecules/Message/Message";
import SectionCreator from "../../molecules/SectionCreator/SectionCreator";
import SectionLayout from "../../layouts/SectionLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import useIntersectionObserver from "../../../util/hooks/useIntersectionObserver";

const MoreStories = () => {
  const router = useRouter();

  const loadMoreRef = useRef();

  const fetchInfinitePosts = async ({ pageParam = "" }) => {
    try {
      console.log(pageParam);

      const response = await client.fetch(
        `*[editorApproved && _type == "post" && (_id > '${pageParam}' )] | order(_id) [0...4] {_id, _createdAt, title, mainImage, slug, frontPage, landingPage}`,
        pageParam
      );

      if (response.length > 0) {
        pageParam = response[response.length - 1]._id;
      } else {
        pageParam = null;
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
    getNextPageParam: (lastPage, pages, lastId) => {
      if (lastPage.length < 4) return undefined;
      return lastPage[lastPage.length - 1]._id;
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
    if (data === null || undefined) return;
    return (
      <>
        {data != null ? (
          <>
            <Grid container className={styles.itemList}>
              {data.pages.slice(1).map((group, i) => (
                <React.Fragment key={i}>
                  {group.map((story) => (
                    // <Grid container className={styles.itemList}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      className={styles.listItem}
                      key={story._id}
                    >
                      <Link
                        href={`/story/${story.slug.current}`}
                        aria-label="To article page"
                      >
                        {/* <a> */}
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
                        {/* </a> */}
                      </Link>
                    </Grid>
                    // </Grid>
                  ))}
                </React.Fragment>
              ))}
              <div
                ref={loadMoreRef}
                className={!hasNextPage ? styles.hidden : ""}
              >
                {isFetchingNextPage ? "Loading more..." : ""}
              </div>
            </Grid>
            <div>
              {/* <div>{isFetchingNextPage ? "Loading more... " : null}</div> */}

              {isLoading && (
                <>
                  <Loader />
                </>
              )}

              {!hasNextPage && !isLoading && <div>No more content.</div>}
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
