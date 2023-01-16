import S from "@sanity/desk-tool/structure-builder";

export default () =>
  // S.list().title("Contents").items(S.documentTypeListItems());
  S.list()
    .title("Content")
    .items([
      // S.listItem()
      //   .title("Top Story")
      //   .child(S.document().schemaType("topStory").documentId("topStory")),
      ...S.documentTypeListItems(),
    ]);
