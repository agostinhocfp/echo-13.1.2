export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      isUnique: true,
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
