import PQueue from "p-queue";
import { v4 as uuidv4, v4 } from "uuid";

import { client } from "../../sanity_client/config/client";

const feedDocuments = async function () {
  const queue = new PQueue({
    concurrency: 1,
    interval: 1000 / 25,
  });

  for (let i = 0; i < 2; i++) {
    queue.add(() =>
      client.create({
        _id: `document-${uuidv4()}`,
        _type: "post",
        author: {
          _type: "reference",
          _ref: "eff21c42-d2e5-43f6-bfa6-9efc92259a12",
        },
        title: `One beautiful post we just added using a script-${i}`,
        subtitle: `One beautiful post we just added using a script-${i} One beautiful post we just added using a script-${i}One beautiful post we just added using a script-${i}`,
        editorApproved: true,
        categories: [
          {
            _key: uuidv4(),
            _type: "reference",
            _ref: "983cead4-d1dc-4b30-ac94-4fddf0cf90ac",
          },
        ],
        tags: [
          {
            _key: uuidv4(),
            _type: "reference",
            _ref: "9655a631-8aa9-4e27-9749-b683e8d9b7d1",
          },
        ],
        mainImage: {
          _type: "image",
          _sanityAsset:
            // "clientassets\best-animated-series-animaniacs1607556142624.webp",
            "../assets/best-animated-series-animaniacs1607556142624.webp",
        },
      })
    );
  }

  queue.add(() => client.patch("id").inc("visits").commit());
};

export default feedDocuments;
