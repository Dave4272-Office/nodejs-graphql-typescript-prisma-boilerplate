import { mergeTypeDefs } from "@graphql-tools/merge";
import {
  DocumentNode,
  GraphQLObjectType,
  GraphQLSchema,
  parse,
  printSchema,
} from "graphql";
import { authorMutation, authorQuery, authorSchema } from "./author";
import { bookQuery, bookSchema } from "./book";

function codeToSchema(params: GraphQLObjectType[]): DocumentNode {
  return parse(printSchema(new GraphQLSchema({ types: params })));
}

export const schema: DocumentNode = mergeTypeDefs([
  codeToSchema([authorSchema, bookSchema]),
  codeToSchema([authorQuery]),
  codeToSchema([bookQuery]),
  codeToSchema([authorMutation]),
]);
