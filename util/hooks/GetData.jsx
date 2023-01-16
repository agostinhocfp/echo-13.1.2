import { client } from "../../sanity_client/config/client";

export default async function getData(query) {
  const response = await client.fetch(query);
  const data = await response;
  return data;
}
