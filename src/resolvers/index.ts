import { Resolvers } from "../graphql/graphql-types";

export const resolvers: Resolvers = {
  Query: {
    books: (_parent, _args, context, _info) => {
      if (_args.author) {
        return context.prisma.author
          .findFirst({
            where: {
              name: _args.author,
            },
          })
          .book();
      } else {
        return context.prisma.book.findMany();
      }
    },
    authors: (_parent, _args, context, _info) => {
      return context.prisma.author.findMany();
    },
    book: (_parent, _args, context, _info) => {
      return context.prisma.book.findUnique({
        where: {
          id: Number(_args.id),
        },
      });
    },
    author: (_parent, _args, context, _info) => {
      return context.prisma.author.findUnique({
        where: {
          id: Number(_args.id),
        },
      });
    },
  },
  Book: {
    author: (_parent, _args, context, _info) => {
      return context.prisma.author.findUnique({
        where: {
          id: _parent.author_id,
        },
      });
    },
  },
  Mutation: {
    author: (_parent, _args, context, _info) => {
      if (_args.id) {
        return context.prisma.author.update({
          where: {
            id: Number(_args.id),
          },
          data: {
            name: _args.name,
            gender: _args.gender,
          },
        });
      } else {
        return context.prisma.author.create({
          data: {
            name: _args.name,
            gender: _args.gender,
          },
        });
      }
    },
  },
};
