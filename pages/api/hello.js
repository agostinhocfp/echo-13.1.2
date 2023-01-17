// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import logger from "../../services/logger";

export default function handler(req, res) {
  logger.info(`Request headers: ${JSON.stringify(req.headers)}`);

  try {
    throw new Error("oops there was an error");
  } catch (error) {
    logger.error(error.stack);
    return res
      .status(400)
      .json({ code: "oops", message: "there was an error" });
  }

  res.status(200).json({ name: "John Doe" });
}
