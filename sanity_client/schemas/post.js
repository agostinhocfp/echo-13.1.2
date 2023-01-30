export default {
  name: "post",
  title: "Post",
  type: "document",
  validation: (Rule) => [
    Rule.custom((document) => {
      if (document.tags?.length < 2) {
        return "Post needs at least 2 tags";
      }
      if (!!document.title && document.title === document.subtitle) {
        return "Title and subtitle must be different from eachother.";
      }
      return true;
    }),
    Rule.custom((document) => {
      if (!!document.title && document.title === document.subtitle) {
        return "Title and subtitle must be different from eachother.";
      }
      return true;
    }),
  ],
  validation: (Rule) =>
    Rule.custom((document) => {
      if (!!document.title && document.title === document.subtitle) {
        return "Title and subtitle must be different from eachother.";
      }
      return true;
    }),
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      // Only show the subtitle field if the title field is truthy:
      hidden: ({ document }) => !document?.title,
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
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
        accept: "image/webp",
      },
    },
    {
      name: "image23",
      title: "Image 2:3",
      type: "image",
      options: {
        hotspot: true,
        accept: "image/webp",
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      readOnly: ({ currentUser }) => {
        return !currentUser.roles.find(({ name }) => name === "administrator");
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", weak: true, to: { type: "tag" } }],
    },
    {
      name: "language",
      title: "Language",
      type: "string",
      initialValue: "PT",
      // readOnly: "true",
    },
    {
      name: "views",
      title: "Views",
      type: "number",
      initialValue: 0,
      // readOnly: "true",
    },
    {
      name: "shareCount",
      title: "Shared count",
      type: "number",
      initialValue: 0,
      readOnly: "true",
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      readOnly: true,
      options: {
        dateFormat: "DD-MM-YYYY",
        timeFormat: "HH:mm",
        timeStep: 15,
        // calendarTodayLabel: "Today",
      },
    },
    {
      name: "editorApproved",
      title: "Editor Approved",
      type: "boolean",
    },
    {
      name: "frontPage",
      title: "Front Page",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "landingPage",
      title: "Landing Page",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "body",
      title: "Body Text",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
