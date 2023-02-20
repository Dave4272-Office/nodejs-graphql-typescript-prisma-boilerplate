import { GraphQLEnumType } from "graphql";

export const genderSchema: GraphQLEnumType = new GraphQLEnumType({
  name: "Gender",
  description: "Enum for Gender",
  values: {
    Male: {
      value: 0,
    },
    Female: {
      value: 1,
    },
  },
});
