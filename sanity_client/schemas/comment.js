export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "string",
    },
    {
      name: "userName",
      title: "User name",
      type: "string",
    },
    { name: "image", title: "Image", type: "string" },
    {
      name: "likes",
      title: "Likes",
      type: "number",
      initialValue: 0,
      readOnly: "true",
    },
    {
      name: "dislikes",
      title: "Dislikes",
      type: "number",
      initialValue: 0,
      readOnly: "true",
    },
  ],
};
