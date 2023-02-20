import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import prismaClient from "@prisma/client";
import cors from "cors";
import express, { Express, json } from "express";
import http, { Server } from "http";
import { Logger } from "winston";
import { Config, sendFavicon } from "./config";
import { Context } from "./context";
import { typeDefs } from "./graphql";
import { resolvers } from "./resolvers";

const log: Logger = Config.logger;

const app: Express = express();
const httpServer: Server = http.createServer(app);

app.use(cors());

const server: ApolloServer<Context> = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (error) => {
    log.error(error);
    return error;
  },
  logger: log,
});

await server.start();

app.get("/favicon.ico", sendFavicon);

app.use(
  "/",
  cors<cors.CorsRequest>(),
  json({ limit: Config.env.requestLimit }),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const prisma = new prismaClient.PrismaClient({
        log: [
          { emit: "event", level: "query" },
          { emit: "event", level: "error" },
          { emit: "event", level: "warn" },
          { emit: "event", level: "info" },
        ],
      });
      prisma.$on("error", (e) => log.error(e));
      prisma.$on("warn", (e) => log.warn(e));
      prisma.$on("query", (e) => log.debug(e.query, e));
      prisma.$on("info", (e) => log.info(e));
      return {
        req: req,
        res: res,
        prisma: prisma,
      };
    },
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: Config.env.port }, resolve)
);
log.info(
  `🚀 Server started and` +
    ` GraphQL API ready @` +
    ` http://localhost:${Config.env.port}/` +
    ` with request size limit of ${Config.env.requestLimit}`
);
