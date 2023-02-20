import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { authorSchema } from "./author";

export const bookSchema: GraphQLObjectType = new GraphQLObjectType({
  name: "Book",
  description: "Represents a book",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "GUID of book data",
    },
    title: {
      type: GraphQLString,
      description: "Title of Book",
    },
    author: {
      type: authorSchema,
      description: "Author of Book",
    },
    inStock: {
      type: GraphQLBoolean,
      description: "Book available in stock",
    },
  },
});

export const bookQuery: GraphQLObjectType = new GraphQLObjectType({
  name: "Query",
  fields: {
    books: {
      type: new GraphQLList(bookSchema),
      description: "List of Books",
      args: {
        author: {
          type: GraphQLString,
          description: "Filter books through author name",
        },
      },
    },
    book: {
      type: bookSchema,
      description: "Returns Book data of given GUID",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "GUID of Book",
        },
      },
    },
  },
});
