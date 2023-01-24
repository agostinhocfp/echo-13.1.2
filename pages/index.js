import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import Hero9 from "../components/sections/Hero9/Hero9";
const MostPopular = dynamic(() =>
  import("../components/sections/MostPopular/MostPopular")
);
const LatestNews = dynamic(() =>
  import("../components/sections/LatestNews/LatestNews")
);
const MoreStories = dynamic(() =>
  import("../components/sections/MoreStories/MoreStories")
);
import styles from "../styles/Home.module.css";
import Loader from "../components/nano/Loader/Loader";
import getData from "../util/hooks/GetData";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import Message from "../components/molecules/Message/Message";
import Top from "../components/sections/Top/Top";

const Home = () => {
  const { data, isError, error, isLoading } = useQuery(
    ["allPosts"],
    getAllPosts,
    { cacheTime: 5000, keepPreviousData: true, refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return (
      <div className={`${styles.loaderContainer} ${styles.status}`}>
        <Loader />
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

  return (
    <div className={styles.container}>
      <Hero9 posts={data.filter((post) => post.landingPage == true)} />
      <MostPopular posts={data} />
      <Top posts={data} />
      <LatestNews />
      <MoreStories />
      {/* NewsLetter or s/omething else */}
    </div>
  );
};

const sanityPostQuery =
  "*[editorApproved]{_id, mainImage, image23, frontPage, landingPage, title, subtitle, slug, frontPage, author->{name}, _createdAt, views, categories[]->, tags[]->}";

async function getAllPosts() {
  const response = await getData(sanityPostQuery);

  return response;
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["allPosts"], getAllPosts);

  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
