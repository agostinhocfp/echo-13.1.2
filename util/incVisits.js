import PQueue from "p-queue";
import { client } from "../../client/sanity_client/config/client";

const incVisits = async function (id) {
  const queue = new PQueue({
    concurrency: 1,
    interval: 1000 / 25,
  });

  queue.add(() =>
    client.patch({
      query: `*[_type == 'post' && _id == '${id}']`,
      inc: {
        views: 1,
      },
    })
  );

  queue.add(() => client.patch(id).inc({ views: 1 }).commit());
};

export default incVisits;
