import { client } from "../../sanity_client/config/client";

const deleteDocument = async () => {
  await client
    .delete({ query: `*[title match '*A beautiful']` })
    .then(console.log)
    .catch(console.error);
};

export default deleteDocument;
