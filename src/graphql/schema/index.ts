import { mergeTypeDefs } from "@graphql-tools/merge";
import { GraphQLObjectType, GraphQLSchema, parse, printSchema } from "graphql";
import { authorMutation, authorQuery, authorSchema } from "./author";
import { bookQuery, bookSchema } from "./book";

const codeToSchema = (params: GraphQLObjectType[]) => {
  return parse(printSchema(new GraphQLSchema({ types: params })));
};

export const schema = mergeTypeDefs([
  codeToSchema([authorSchema, bookSchema]),
  codeToSchema([authorQuery]),
  codeToSchema([bookQuery]),
  codeToSchema([authorMutation]),
]);
