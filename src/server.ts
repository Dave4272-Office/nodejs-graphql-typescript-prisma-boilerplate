import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import prismaClient from "@prisma/client";
import cors from "cors";
import express, { json } from "express";
import { Context } from "./context";
import { typeDefs } from "./graphql";
import { resolvers } from "./resolvers";

const app = express();
const port = 4000; // default port to listen

app.use(cors());

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

await server.start();

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({
      req: req,
      res: res,
      prisma: new prismaClient.PrismaClient({ log: ["query"] }),
    }),
  })
);

// start the Express server
app.listen({ port }, () => {
  console.clear();
  console.log(`🚀 Server started at http://localhost:${port}`);
  console.log(
    `🚀 GraphQL API ready at http://localhost:${port}/graphql`
  );
  console.log("=======================================");
});
