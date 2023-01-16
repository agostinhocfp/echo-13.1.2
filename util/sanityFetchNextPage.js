// import { client } from "../sanity_client/config/client";

// export default async function sanityFetchNextPage(query, lastId) {
//   if (lastId === null) {
//     return [];
//   }

//   const { result } = await client.fetch(query, { lastId });
//   console.log(lastId);

//   if (result.length > 0) {
//     lastId = result[result.length - 1]._id;
//   } else {
//     lastId = null; // Reached the end
//   }
//   return result;
// }
