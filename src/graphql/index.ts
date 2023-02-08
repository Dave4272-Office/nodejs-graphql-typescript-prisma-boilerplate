import { readFileSync } from "fs";
import { parse } from "graphql";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const typeDefs = parse(
  readFileSync(
    path.resolve(dirname(fileURLToPath(import.meta.url)), "./schema.graphql"),
    "utf-8"
  )
);
