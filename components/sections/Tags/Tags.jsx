// import React from "react";
// import getData from "../../../util/hooks/GetData";
// import { useQueries } from "@tanstack/react-query";

// const containsObject = (array, obj) => {
//   return array.some((el) => el.id === obj.id);
// };

// const Tags = ({ posts }) => {
//   const tagQueries = TAGS_TO_SHOW.map(({ id, title }) => {
//     return {
//       queryKey: [`tag ${id}`],
//       queryFn: () =>
//         getData(
//           `*['${title}' in tags[]->title] | order(_createdAt desc)[0...5]{mainImage, title, subtitle, slug, author->{name}, tags[]->{title}, editorApproved, _createdAt}`
//         ),
//       staleTime: Infinity,
//     };
//   });

//   const results = useQueries({
//     queries: tagQueries,
//   });

//   let resultPosts = [];
//   let i = 0;
//   // results.forEach((item) => {
//   //   console.log(item.data);
//   // });

//   // console.log(results);
//   // console.log(resultsPosts);

//   // console.log(posts);
//   // console.log(arr);
//   return <div>Tags</div>;
// };

// const TAGS_TO_SHOW = [
//   { id: 0, title: "Angola", route: "/" },
//   { id: 1, title: "Portugal", route: "/" },
//   { id: 2, title: "Brazil", route: "/" },
//   { id: 3, title: "Africa", route: "/" },
//   { id: 4, title: "International", route: "/" },
//   { id: 5, title: "Google", route: "/" },
// ];

// export default Tags;
