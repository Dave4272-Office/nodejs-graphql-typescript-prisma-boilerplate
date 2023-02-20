import { createLogger, format, Logger } from "winston";
import transports from "winston/lib/winston/transports";

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const winstonTransports = [
  new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
  }),
  // new transports.Http({
  //   host: "localhost",
  //   port: 5000,
  //   path: "/",
  //   batch: true,
  //   batchInterval: 5000,
  //   batchCount: 10,
  //   format: format.combine(
  //     format.timestamp(),
  //     format.json(),
  //     //format.logstash()
  //   ),
  // }),
];

export const logger: Logger = createLogger({
  level: 'trace',
  levels: logLevels,
  transports: winstonTransports,
  exceptionHandlers: winstonTransports,
  rejectionHandlers: winstonTransports,
});
