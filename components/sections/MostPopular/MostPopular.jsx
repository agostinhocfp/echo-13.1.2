import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { motion } from "framer-motion";

// Refactor
const MostPopular = ({ posts }) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(5);

  const mostPopularPosts = posts
    .filter((post) => post.landingPage !== true && post.frontPage !== true)
    .map((post) => post)
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  const width = useWindowSize();

  let stat = { hidden: { opacity: 0 }, show: { opacity: 1 } };

  useEffect(() => {
    if (width <= 400) setVisibleSlides(1);
    else if (width < 550) setVisibleSlides(2);
    else if (width <= 850) setVisibleSlides(3);
    else if (width <= 1400) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  useEffect(() => {
    setDomLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (data) => {
    return (
      <>
        {domLoaded && (
          <>
            <motion.div
              className={styles.list}
              variants={parent}
              initial="hidden"
              animate="show"
              role="slider"
            >
              {data?.slice(0, 6).map((story) => {
                return (
                  <motion.div
                    key={story._id}
                    variants={stat}
                    whileInView={{ y: [100, 0], opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    aria-label={`Carousel article: ${story.title}`}
                    role={"listitem"}
                  >
                    <div className={styles.listItem}>
                      <Link
                        href={`/story/${story.slug.current}`}
                        aria-label="To article page"
                      >
                        {story?.slug.current ? (
                          <SanityImage
                            className={styles.image}
                            alt={`Carousel article: ${story.title}`}
                            imageRef={
                              story.image23 != null
                                ? story.image23
                                : story.mainImage
                            }
                            objectFit="cover"
                            priority={false}
                            quality={50}
                            width={400}
                            height={400}
                          />
                        ) : null}
                        <div className={styles.title}>
                          <Typography variant="h7">{story.title}</Typography>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
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
          <div>{renderContent(mostPopularPosts)}</div>
        </Carousel>
      </SectionCreator>
    </SectionLayout>
  );
};

export default MostPopular;

// const MostPopular = ({ posts }) => {
//   const [domLoaded, setDomLoaded] = useState(false);
//   const [visibleSlides, setVisibleSlides] = useState(5);
//   const queryClient = useQueryClient();

//   console.log(posts);

//   const width = useWindowSize();

//   let stat = { hidden: { opacity: 0 }, show: { opacity: 1 } };

//   useEffect(() => {
//     if (width <= 400) setVisibleSlides(1);
//     else if (width < 550) setVisibleSlides(2);
//     else if (width <= 850) setVisibleSlides(3);
//     else if (width <= 1400) setVisibleSlides(4);
//     else setVisibleSlides(5);
//   }, [width]);

//   useEffect(() => {
//     try {
//       queryClient.prefetchQuery(["mostPopularNews"], () =>
//         fetchMostPopularPosts()
//       );
//     } catch (error) {}

//     setDomLoaded(true);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const { data, isError, error, isLoading } = useQuery(
//     ["mostPopularNews"],
//     () => fetchMostPopularPosts(),
//     { keepPreviousData: true, refetchOnWindowFocus: false, staleTime: 300000 }
//   );

//   if (isLoading) return <Loader />;
//   if (isError) {
//     return (
//       <Message severity={"error"} alertTitle="Oops, something went wrong">
//         {error.toString()}
//       </Message>
//     );
//   }

//   const renderContent = (data) => {
//     return (
//       <>
//         {domLoaded && (
//           <>
//             <motion.div
//               className={styles.list}
//               variants={parent}
//               initial="hidden"
//               animate="show"
//               role="slider"
//             >
//               {data?.slice(0, 6).map((story) => {
//                 return (
//                   <motion.div
//                     key={story._id}
//                     variants={stat}
//                     whileInView={{ y: [100, 0], opacity: [0, 1] }}
//                     transition={{ duration: 0.5 }}
//                     aria-label={`Carousel article: ${story.title}`}
//                     role={"listitem"}
//                   >
//                     <div className={styles.listItem}>
//                       <Link
//                         href={`/story/${story.slug.current}`}
//                         aria-label="To article page"
//                       >
//                         {story?.slug.current ? (
//                           <SanityImage
//                             className={styles.image}
//                             alt={`Carousel article: ${story.title}`}
//                             imageRef={
//                               story.image23 != null
//                                 ? story.image23
//                                 : story.mainImage
//                             }
//                             objectFit="cover"
//                             priority={false}
//                             quality={50}
//                             width={400}
//                             height={400}
//                           />
//                         ) : null}
//                         <div className={styles.title}>
//                           <Typography variant="h7">{story.title}</Typography>
//                         </div>
//                       </Link>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           </>
//         )}
//       </>
//     );
//   };

//   return (
//     <SectionLayout>
//       <SectionCreator title="Destaques" justifyTitle="left">
//         <Carousel
//           totalSlides={6}
//           visibleSlides={visibleSlides}
//           isPlaying
//           interval="100"
//         >
//           <div>{renderContent(data)}</div>
//         </Carousel>
//       </SectionCreator>
//     </SectionLayout>
//   );
// };

// export default MostPopular;

// const sanityPostQuery =
//   "*[editorApproved][0...6] | order(views desc){_id, mainImage, image23, title, subtitle, slug, frontPage, author->{name}, _createdAt, categories[]->, tags[]->}";

// async function fetchMostPopularPosts() {
//   const response = await getData(sanityPostQuery);
//   return response;
// }
