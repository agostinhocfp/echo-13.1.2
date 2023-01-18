import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const getLogger = (filename = "echo") => {
  const fileLogTransport = new transports.DailyRotateFile({
    filename: `logs/${filename}-%DATE%.log`,
    datePattern: `dd-mm-yyyy`,
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "30d",
  });

  const consoleTransport = new transports.Console({
    level: process.env.LOG_LEVEL,
    handleExceptions: false,
    json: true,
    colorize: true,
    format: format.printf((i) => `${i.message}`),
  });

  const logger = createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      format.errors({ stack: true }),
      format.printf(
        ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}`
      )
    ),
    defaultMeta: { service: "echo" },
    transports: [consoleTransport],
  });

  if (process.env.NODE_ENV === "development") {
    logger.add(fileLogTransport);
  }

  return logger;
};

export default getLogger();
