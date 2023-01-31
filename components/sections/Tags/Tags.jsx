import React from "react";

const Tags = ({ posts }) => {
  const getPostsByTagQuery = `*['' in tags[]->title] | order(_createdAt desc)[0]{mainImage, title, subtitle, slug, author->{name}, tags[]->{title}, editorApproved, _createdAt}`;
  const getPostByTagQuery0 = `*['${TAGS_TO_SHOW[0].title}' in tags[]->title] | order(_createdAt desc)[0]{mainImage, title, subtitle, slug, author->{name}, tags[]->{title}, editorApproved, _createdAt}`;

  const arr = [];

  TAGS_TO_SHOW.map((category, i) => {
    // console.log(posts.find((item) => item.tags.title == category.title));
    const result = posts.find((item) => {
      return item.tags.title == category.title;
    });

    console.log(result);
  });

  // console.log(posts);
  // console.log(arr);
  return <div>Tags</div>;
};

const TAGS_TO_SHOW = [
  { id: 0, title: "Angola", route: "/" },
  { id: 1, title: "Portugal", route: "/" },
  { id: 2, title: "Brazil", route: "/" },
  { id: 3, title: "Africa", route: "/" },
  { id: 4, title: "International", route: "/" },
  { id: 5, title: "Google", route: "/" },
];

export default Tags;
