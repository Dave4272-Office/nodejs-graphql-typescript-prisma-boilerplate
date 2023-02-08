import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { genderSchema } from "./gender";

export const authorSchema = new GraphQLObjectType({
  name: "Author",
  description: "Represents an author of a book",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "GUID of author data",
    },
    name: {
      type: GraphQLString,
      description: "Name of Author",
    },
    gender: {
      type: genderSchema,
      description: "Gender of Author",
    },
  },
});

export const authorQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    authors: {
      type: new GraphQLList(authorSchema),
      description: "List of Authors",
    },
    author: {
      type: authorSchema,
      description: "Returns Author data of given GUID",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "GUID of author",
        },
      },
    },
  },
});

export const authorMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    author: {
      type: authorSchema,
      description: "Creates / Updates one author data",
      args: {
        id: {
          type: GraphQLID,
          description:
            "If provided updates existing value else creates a new record",
        },
        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: "author name",
        },
        gender: {
          type: new GraphQLNonNull(genderSchema),
          description: "author gender",
        },
      },
    },
  },
});
