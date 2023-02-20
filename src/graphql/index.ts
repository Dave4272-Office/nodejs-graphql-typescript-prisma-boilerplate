import { readFileSync } from "fs";
import { DocumentNode, parse } from "graphql";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const typeDefs: DocumentNode = parse(
  readFileSync(
    path.resolve(dirname(fileURLToPath(import.meta.url)), "./schema.graphql"),
    "utf-8"
  )
);
