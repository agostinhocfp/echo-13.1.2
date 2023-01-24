import React, { useContext, useEffect, useRef } from "react";
import { useQuery, useInfiniteQuery, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { Grid, Typography } from "@mui/material";

import SectionLayout from "../../components/layouts/SectionLayout/SectionLayout";
import { client } from "../../sanity_client/config/client";
import getData from "../../util/hooks/GetData";
import Loader from "../../components/nano/Loader/Loader";
import Message from "../../components/molecules/Message/Message";
import styles from "./Category.module.css";
import Radar from "../../components/sections/Radar/Radar";
import RouteTabContext from "../../contexts/RouteTabContext";
import MAIN_ROUTES from "../../constants/ROUTES";
import useWindowSize from "../../util/hooks/useWindowSize";
import theme from "../../ui/theme";
import NewsCard1 from "../../components/molecules/NewsCard1/NewsCard1";
import SanityImage from "../../hooks/SanityImage/SanityImage";
import useIntersectionObserver from "../../util/hooks/useIntersectionObserver";

const Category = (props) => {
  const value = useContext(RouteTabContext);
  const { selectedIndex } = value;
  const router = useRouter();
  const width = useWindowSize();

  const loadMoreRef = useRef();

  useEffect(() => {}, [router.asPath, selectedIndex]);

  const getTopCategoryPostQuery = `*['/${router.asPath}' in categories[]->route] | order(_createdAt desc)[0]{mainImage, title, subtitle, slug, author->{name}, tags[]->{title}, editorApproved, _createdAt}`;

  const {
    data: topData,
    isError: topIsError,
    error: topError,
    isLoading: topIsLoading,
  } = useQuery(
    {
      querykey: ["topPost"],
      queryFn: () => getData(getTopCategoryPostQuery),
      initialData: props.topPost,
    },
    { refetchOnMount: true }
  );

  const fetchInfinitePosts = async ({
    pageParam = { lastCreatedAt: "", lastId: "" },
  }) => {
    try {
      var response = null;

      if (pageParam.lastCreatedAt != "" || pageParam.lastId != "") {
        response = await client.fetch(
          `*[editorApproved && '/${props.route}' in categories[]->route  && _type == "post" && (_createdAt < '${pageParam.lastCreatedAt}' || (_createdAt == '${pageParam.lastCreatedAt}' && _id < '${pageParam.lastId}'))] | order(_createdAt desc) [0...4] {_id, _createdAt, title, mainImage, slug, frontPage, landingPage}`,
          pageParam
        );
      } else {
        response = await client.fetch(
          `*[editorApproved && '/${props.route}' in categories[]->route && _type == "post" && (_createdAt > '' || (_createdAt == '' && _id > ''))] | order(_createdAt desc) [0...4] {_id, _createdAt, title, mainImage, slug, frontPage, landingPage}`,
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
    refetchOnMount: true,
  });

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <Message severity={"error"} alertTitle="Oops, Ocorreu um erro.">
        Não podemos mostrar este conteúdo. Pedimos as nossas sinceras desculpas.
      </Message>
    );
  }

  if (topIsLoading) return <Loader />;
  if (topIsError) {
    return (
      <Message severity={"error"} alertTitle="Oops, something went wrong">
        {topError.toString()}
      </Message>
    );
  }

  let frontItem = props.topPost;

  const renderContent = () => {
    if (selectedIndex != null) {
      return (
        <>
          <Typography className={styles.pageTitle} variant="h3">
            {MAIN_ROUTES[selectedIndex].titlePT != null
              ? MAIN_ROUTES[selectedIndex]?.titlePT
              : null}
          </Typography>

          <Grid container className={styles.contentGridContainer}>
            <Grid
              item
              container
              xs={12}
              md={9}
              className={styles.contentContainer}
            >
              {/* Front Post */}
              <div className={styles.frontPostContainer}>
                <div className={styles.frontPostImageContainer}>
                  <SanityImage
                    className={styles.frontPostImage}
                    href={frontItem.mainImage}
                    alt={`Article: ${frontItem.title}`}
                    priority={true}
                    quality={50}
                    width={width > 900 ? 900 : 700}
                    height={width > 900 ? 500 : 400}
                    onClick={() =>
                      router.push(`/news/${frontItem.slug.current}`)
                    }
                    onKeyDown={() =>
                      router.push(`/news/${frontItem.slug.current}`)
                    }
                  />
                </div>{" "}
                <div className={styles.frontPostTitleContainer}>
                  {width > 800 ? (
                    <Link
                      href={`/story/${frontItem.slug.current}`}
                      aria-label="To article page"
                    >
                      <Typography
                        className={styles.frontPostTitle}
                        variant={width > 900 ? "h4" : "h5"}
                      >
                        {frontItem.title}
                      </Typography>
                    </Link>
                  ) : (
                    <Link
                      href={`/story/${frontItem.slug.current}`}
                      aria-label="To article page"
                    >
                      <Typography
                        className={styles.frontPostTitle}
                        variant={width > 900 ? "h5" : "h6"}
                      >
                        {frontItem.title}
                      </Typography>
                    </Link>
                  )}
                </div>
              </div>

              {/* Infinite content */}
              {data != null ? (
                <>
                  {width > 900 ? (
                    <>
                      {data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                          {group.map((post, j, { length }) => (
                            <>
                              {i === 0 && j === 0 ? null : (
                                <React.Fragment key={post._id}>
                                  <NewsCard1 post={post} />
                                  {length - 1 === j ? null : (
                                    <hr className={styles.divider} />
                                  )}
                                </React.Fragment>
                              )}
                            </>
                          ))}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <>
                      <Grid container>
                        {data.pages.map((group, i) => (
                          <React.Fragment key={i}>
                            {group.map((post, j, { length }) => (
                              <>
                                {i === 0 && j === 0 ? null : (
                                  <>
                                    {" "}
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={4}
                                      key={post._id}
                                    >
                                      <NewsCard1 post={post} key={post._id} />
                                      {length - 1 === j &&
                                      !hasNextPage ? null : (
                                        <hr className={styles.divider} />
                                      )}
                                    </Grid>
                                  </>
                                )}
                              </>
                            ))}
                          </React.Fragment>
                        ))}
                      </Grid>
                    </>
                  )}
                </>
              ) : null}

              {/* Loading Status Container */}
              <div ref={loadMoreRef}>
                <div>
                  {isFetchingNextPage ? (
                    <div className={styles.loadingStatusContainer}>
                      <Typography
                        className={styles.loadingStatus}
                        variant="body1"
                      >
                        Loading more...
                      </Typography>
                    </div>
                  ) : null}
                </div>
                {isLoading && (
                  <>
                    <Loader />
                  </>
                )}

                {!hasNextPage && !isLoading && (
                  <div className={styles.loadingStatusContainer}>
                    <Typography
                      className={styles.loadingStatus}
                      variant="body1"
                    >
                      No more content.
                    </Typography>
                  </div>
                )}
              </div>
            </Grid>

            {/* Radar */}
            {width > 900 ? (
              <>
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{ [theme.breakpoints.down("md")]: { display: "none" } }}
                >
                  <Radar post={frontItem} />
                </Grid>
              </>
            ) : null}
          </Grid>
        </>
      );
    }
  };

  return (
    <SectionLayout>
      <div className={styles.root}>{renderContent()}</div>
    </SectionLayout>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "category"]{route}`;

  const categories = await client.fetch(query);

  const paths = categories.map((category) => ({
    params: {
      route: category.route,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export async function getStaticProps({ params: { route } }) {
  const queryClient = new QueryClient();

  // const getTopCategoryPostQuery = `*['/${route}' in categories[]->route && dateTime(_createdAt) < dateTime(now()) - 60*60*24*60] | order(views desc)[0]{mainImage, title, subtitle, slug, author->{name}, tags[]->{title}, editorApproved, _createdAt}`;
  const getTopCategoryPostQuery = `*['/${route}' in categories[]->route] | order(_createdAt desc)[0]{mainImage, title, subtitle, slug, author->{name}, tags[]->{title}, editorApproved, _createdAt}`;

  const topPost = await getData(getTopCategoryPostQuery);

  await queryClient.prefetchQuery(
    ["moreStories"],
    getData(
      `*[editorApproved && '/${route}' in categories[]->route && _type == "post" && (_createdAt > '' || (_createdAt == '' && _id > ''))] | order(_createdAt desc) [0...4] {_id, _createdAt, title, mainImage, slug, frontPage, landingPage}`
    )
  );

  return {
    props: {
      topPost,
      route,
    },
  };
}

export default Category;
