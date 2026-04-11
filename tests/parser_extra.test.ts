import { describe, it, expect } from "vitest";
import { Lexer } from "../src/lexer";
import { Parser } from "../src/parser";

describe("Parser - Extra Features", () => {
  const parse = (source: string) => {
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    return parser.parse();
  };

  it("should parse foreach (every one also)", () => {
    const source = `eh listen lah
      every one also (item in list) {
        oi item;
      }
    ok lah bye`;
    const ast = parse(source);
    expect(ast.body[0].type).toBe("ForEach");
    expect((ast.body[0] as any).name).toBe("item");
    expect((ast.body[0] as any).arr.type).toBe("Identifier");
    expect((ast.body[0] as any).arr.name).toBe("list");
  });

  it("should parse switch (which one lah)", () => {
    const source = `eh listen lah
      which one lah (x) {
        if it's 1 { oi "one"; }
        if it's 2 { oi "two"; }
        last resort { oi "many"; }
      }
    ok lah bye`;
    const ast = parse(source);
    expect(ast.body[0].type).toBe("Switch");
  });

  it("should handle complex operator precedence", () => {
    const source = `eh listen lah
      eh got x = 1 + 2 * 3 same same 7 and also can or can cannot;
    ok lah bye`;
    const ast = parse(source);
    expect(ast.body[0].type).toBe("VarDeclaration");
  });

  it("should handle empty blocks", () => {
    const source = `eh listen lah
      confirm or not (can) {
      }
    ok lah bye`;
    const ast = parse(source);
    expect(ast.body[0].type).toBe("If");
    expect((ast.body[0] as any).consequent.length).toBe(0);
  });
});
