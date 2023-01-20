import React, { useContext } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { Grid, Typography } from "@mui/material";

import SectionLayout from "../../components/layouts/SectionLayout";
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
  const getTopCategoryPostQuery = `*['/${route}' in categories[]->route && dateTime(_createdAt) < dateTime(now()) - 60*60*24*30] | order(views desc)[0]{mainImage, title, subtitle, slug, author->{name}, tags[]->{title}, editorApproved, _createdAt}`;

  const topPost = await getData(getTopCategoryPostQuery);

  return {
    props: {
      topPost,
      route,
    },
  };
}

const Category = (props) => {
  const value = useContext(RouteTabContext);
  const { selectedIndex } = value;
  const router = useRouter();
  const width = useWindowSize();

  // let lastCreatedAt = "";
  // let lastId = "";

  const {
    data: topData,
    isError: topIsError,
    error: topError,
    isLoading: topIsLoading,
  } = useQuery({
    querykey: ["topPost"],
    queryFn: () =>
      getData(
        `*['/${props.route}' in categories[]->route && dateTime(_createdAt) < dateTime(now()) - 60*60*24*30] | order(views desc)[0]{mainImage, title, subtitle, slug, author->{name}, tags[]->{title}, editorApproved, _createdAt}`
      ),
    initialData: props.topPost,
  });

  const fetchInfinitePosts = async ({
    pageParam = { lastId: "", lastCreatedAt: "" },
  }) => {
    try {
      const response = await client.fetch(
        `*[_type == "post" && (
      _createdAt > '${pageParam.lastCreatedAt}'
      || (_createdAt == '${pageParam.lastCreatedAt}' && _id > '${pageParam.lastId}')
    )] | order(_createdAt) [0...6] {mainImage, title, subtitle, slug, author->{name}, tags[]->{title}, editorApproved, _createdAt}`,
        pageParam.lastCreatedAt,
        pageParam.lastId
      );

      if (response.length > 0) {
        pageParam.lastId = response[response.length - 1]._id;
        pageParam.lastCreatedAt = response[response.length - 1]._createdAt;
      } else {
        pageParam.lastId = null;
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
    isSuccess,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["infiniteCategoryPosts"],

    fetchInfinitePosts,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length < 6) return undefined;
        return {
          lastId: lastPage[lastPage.length - 1]._id,
          lastCreatedAt: lastPage[lastPage.length - 1]._createdAt,
        };
      },
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
            {frontItem != null ? (
              <>
                <Grid
                  item
                  container
                  xs={12}
                  md={9}
                  className={styles.contentContainer}
                >
                  <div className={styles.frontPostContainer}>
                    <div className={styles.frontImageContainer}>
                      {frontItem && (
                        <SanityImage
                          href={frontItem.mainImage}
                          alt={`Article: ${frontItem.title}`}
                          priority={true}
                          quality={50}
                          width={width > 900 ? 900 : 700}
                          height={400}
                          onClick={() =>
                            router.push(`/news/${frontItem.slug.current}`)
                          }
                          onKeyDown={() =>
                            router.push(`/news/${frontItem.slug.current}`)
                          }
                        />
                      )}
                      <div className={styles.frontTitleContainer}>
                        {width > 800 ? (
                          <>
                            <Link
                              href={`/story/${frontItem.slug.current}`}
                              aria-label="To article page"
                            >
                              <Typography
                                className={styles.frontTitle}
                                variant={width > 900 ? "h4" : "h5"}
                              >
                                {frontItem.title}
                              </Typography>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              href={`/story/${frontItem.slug.current}`}
                              aria-label="To article page"
                            >
                              <figcaption className={styles.titleFig}>
                                <Typography
                                  className={styles.frontTitle}
                                  variant={width > 900 ? "h5" : "h6"}
                                >
                                  {frontItem.title}
                                </Typography>
                              </figcaption>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {data != null ? (
                    <>
                      {width > 900 ? (
                        <>
                          {isSuccess &&
                            data.pages.map((group, i) => (
                              <React.Fragment key={i}>
                                {group.slice(1).map((post, i, { length }) => (
                                  <React.Fragment key={post._id}>
                                    <NewsCard1 post={post} />
                                    {length - 1 === i ? null : (
                                      <>
                                        <hr className={styles.divider} />
                                      </>
                                    )}
                                  </React.Fragment>
                                ))}
                              </React.Fragment>
                            ))}
                        </>
                      ) : (
                        <>
                          <Grid container>
                            {isSuccess &&
                              data.pages.map((group, i) => (
                                <React.Fragment key={i}>
                                  {group.slice(1).map((post, i, { length }) => (
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={4}
                                      key={post._id}
                                    >
                                      <NewsCard1 post={post} key={post._id} />
                                      {length - 1 === i ? null : (
                                        <>
                                          <hr className={styles.divider} />
                                        </>
                                      )}
                                    </Grid>
                                  ))}
                                </React.Fragment>
                              ))}
                          </Grid>
                        </>
                      )}
                    </>
                  ) : null}
                  <div>
                    <div>{isFetchingNextPage ? "Loading more... " : null}</div>
                    {isLoading && (
                      <>
                        <Loader />
                      </>
                    )}

                    {!hasNextPage && !isLoading && (
                      <div>No more content to scroll</div>
                    )}
                  </div>
                </Grid>
              </>
            ) : null}
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

export default Category;
