import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../sanity_client/config/client";

export default function GetImageProps(src) {
  return useNextSanityImage(client, src);
}
