import { codegen } from "@graphql-codegen/core";
import { Types } from "@graphql-codegen/plugin-helpers";
import * as schemaAstPlugin from "@graphql-codegen/schema-ast";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { schema } from "./schema";

const options: Types.GenerateOptions = {
  config: { numericEnums: true },
  documents: [],
  filename: "schema.graphql",
  schema: schema,
  plugins: [{ "schema-ast": {} }],
  pluginMap: {
    "schema-ast": schemaAstPlugin,
  },
};
const output: string = await codegen(options);
fs.writeFile(
  path.join(path.dirname(fileURLToPath(import.meta.url)), options.filename),
  output,
  () => {
    console.log("Schema generated!");
  }
);
