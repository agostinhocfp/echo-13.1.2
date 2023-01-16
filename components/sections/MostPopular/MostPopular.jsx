import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../sanity_client/config/client";
import Link from "next/link";

import styles from "./MostPopular.module.css";
import Loader from "../../nano/Loader/Loader";
import Message from "../../molecules/Message/Message";
import SectionCreator from "../../molecules/SectionCreator/SectionCreator";
import Carousel from "../../molecules/carousel/Carousel";
import SectionLayout from "../../layouts/SectionLayout";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import useWindowSize from "../../../util/hooks/useWindowSize";
import getData from "../../../util/hooks/GetData";

// const sanityPostQuery =
//   "*[editorApproved][0...5] | order(views desc){mainImage, title, slug}";
const sanityPostQuery =
  "*[editorApproved][0...6] | order(views desc){_id, mainImage, title, subtitle, slug, frontPage, author->{name}, _createdAt, categories[]->, tags[]->}";

async function fetchMostPopularPosts() {
  const response = await getData(sanityPostQuery);
  return response;
}

const MostPopular = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(5);
  const queryClient = useQueryClient();

  const width = useWindowSize();

  useEffect(() => {
    if (width <= 400) setVisibleSlides(1);
    else if (width < 550) setVisibleSlides(2);
    else if (width <= 850) setVisibleSlides(3);
    else if (width <= 1400) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  useEffect(() => {
    try {
      queryClient.prefetchQuery(["mostPopularNews"], () =>
        fetchMostPopularPosts()
      );
    } catch (error) {
      console.log(error);
    }

    setDomLoaded(true);
  }, []);

  const { data, isError, error, isLoading } = useQuery(
    ["mostPopularNews"],
    () => fetchMostPopularPosts(),
    { keepPreviousData: true, refetchOnWindowFocus: false, staleTime: 300000 }
  );

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <Message severity={"error"} alertTitle="Oops, something went wrong">
        {error.toString()}
      </Message>
    );
  }

  const renderContent = (data) => {
    return (
      <>
        {domLoaded && (
          <>
            {data?.slice(0, 6).map((story) => {
              return (
                <div className={styles.listItem} key={story._id}>
                  <Link href={`/story/${story.slug.current}`}>
                    {story?.slug.current ? (
                      <SanityImage
                        className={styles.image}
                        alt={`Carousel article: ${story.title}`}
                        imageRef={story.mainImage}
                        objectFit="cover"
                        priority={false}
                        blur={true}
                        quality={10}
                      />
                    ) : null}
                    <div className={styles.title}>
                      <Typography variant="h7">{story.title}</Typography>
                    </div>
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </>
    );
  };

  return (
    <SectionLayout>
      <SectionCreator title="Destaques" justifyTitle="left">
        <Carousel
          totalSlides={6}
          visibleSlides={visibleSlides}
          isPlaying
          interval="100"
        >
          <div className={styles.list}>{renderContent(data)}</div>
        </Carousel>
      </SectionCreator>
    </SectionLayout>
  );
};

export default MostPopular;