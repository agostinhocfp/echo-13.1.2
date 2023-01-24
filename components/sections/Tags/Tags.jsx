import React from "react";

const Tags = () => {
  const getPostsByTagQuery = `*['/${props.route}' in categories[]->route] | order(_createdAt desc)[0]{mainImage, title, subtitle, slug, author->{name}, tags[]->{title}, editorApproved, _createdAt}`;

  return <div>Tags</div>;
};

const TAGS_TO_SHOW = [
  { id: 0, title: "", route: "/" },
  { id: 1, title: "", route: "/" },
  { id: 2, title: "", route: "/" },
  { id: 3, title: "", route: "/" },
];

export default Tags;
