export default {
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      isUnique: true,
      type: "string",
    },
    {
      name: "titlePT",
      title: "Title PT",
      type: "string",
      options: {
        source: "title",
      },
      isUnique: true,
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      required: true,
      isUnique: true,
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "route",
      title: "Route",
      type: "string",
      isUnique: true,
    },
  ],
};
