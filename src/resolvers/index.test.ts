import { describe, expect, it } from "@jest/globals";
import { resolvers } from ".";

describe('test', () => {
  it('test', () => {
    const x = resolvers.Query?.books
    expect(x).toBeDefined();
  })
})
