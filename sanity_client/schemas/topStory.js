import ReferenceSelect from "../components/ReferenceSelect";

export default {
  name: "topStory",
  title: "Top Story",
  description: "List of top stories to headline website",
  type: "array",
  of: [
    {
      type: "reference",
      to: { type: "post" },
    },
  ],
  inputComponent: ReferenceSelect,
};
