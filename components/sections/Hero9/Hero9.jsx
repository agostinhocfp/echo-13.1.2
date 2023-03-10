import React from "react";
import { Typography } from "@mui/material";
import styles from "./Hero9.module.css";
import SanityImage from "../../../hooks/SanityImage/SanityImage";
import useWindowSize from "../../../util/hooks/useWindowSize";
import Link from "next/link";

const Hero9 = ({ posts }) => {
  const width = useWindowSize();

  const landingPagePost = posts[0];

  const renderContent = () => {
    return (
      <div className={styles.root}>
        <div className={styles.imageContainer}>
          <SanityImage
            className={styles.image}
            alt={`Landing page image of article: ${landingPagePost?.title}`}
            href={landingPagePost?.mainImage}
            priority={true}
            quality={50}
            blue={true}
            height={width < 900 ? 450 : 600}
            width={width < 900 ? 900 : 1350}
            placeholder={"blur"}
          />
        </div>

        <div className={styles.contentContainer}>
          <Link href={`/story/${landingPagePost.slug.current}`}>
            <Typography
              variant={width < 900 ? "h5" : width < 1200 ? "h4" : "h3"}
              className={styles.headline}
            >
              {landingPagePost.title}
            </Typography>
          </Link>
        </div>
      </div>
    );
  };

  return <>{posts != null ? <>{renderContent()}</> : null}</>;
};

export default Hero9;

// const Hero9 = ({ posts }) => {
//   const queryClient = useQueryClient();

//   const router = useRouter();
//   const width = useWindowSize();

//   /(posts);

//   useEffect(() => {
//     try {
//       queryClient.prefetchQuery(["hero"], () => fetchPosts());
//     } catch (error) {
//       return null;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleClick = (e) => {
//     e.preventDefault();
//     router.push(`/story/${data[0].slug.current}`);
//   };

//   const { data, isError, error, isLoading } = useQuery(
//     ["hero"],
//     () => fetchPosts(),
//     { keepPreviousData: true, refetchOnWindowFocus: false, staleTime: 300000 }
//   );

//   if (isLoading) {
//     return (
//       <Box className={`${styles.loaderContainer} ${styles.status}`}>
//         <Loader className={styles.loader} />
//       </Box>
//     );
//   }
//   if (isError) {
//     return (
//       <Box className={styles.messageContainer}>
//         <Message
//           className={`${styles.alertMessage} ${styles.status}`}
//           severity={"error"}
//           alertTitle="Oops, something went wrong"
//         >
//           {error.toString()}
//         </Message>
//       </Box>
//     );
//   }

//   return (
//     <>
//       {data != null ? (
//         <div className={styles.root}>
//           <SanityImage
//             className={styles.image}
//             alt={`Landing page image of article: ${data[0].title}`}
//             imageRef={data[0]?.mainImage}
//             priority={true}
//             quality={50}
//             blue={true}
//             height={width < 900 ? 300 : 650}
//             width={width < 900 ? 900 : 1200}
//             placeholder={"blur"}
//           />

//           <div className={styles.contentContainer} onClick={handleClick}>
//             <Typography
//               variant={width < 900 ? "h4" : width < 1200 ? "h3" : "h2"}
//               className={styles.headline}
//             >
//               {data[0].title}
//             </Typography>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// };

// export default Hero9;

// const sanityPostQuery =
//   "*[landingPage][0...1]{_id, mainImage, title, subtitle, slug, landingPage, author->{name}, _createdAt, categories[]->, tags[]->}";

// async function fetchPosts() {
//   const response = await client.fetch(sanityPostQuery);
//   return response;
// }
