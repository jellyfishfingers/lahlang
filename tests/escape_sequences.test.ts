import { describe, it, expect } from "vitest";
import { Lexer } from "../src/lexer";
import { TokenType } from "../src/tokens";

describe("String Escape Sequences", () => {
  const tokenize = (src: string) => new Lexer(src).tokenize();

  it("should handle \\n escape", () => {
    const tokens = tokenize('"hello\\nworld"');
    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe("hello\nworld");
  });

  it("should handle \\t escape", () => {
    const tokens = tokenize('"col1\\tcol2"');
    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe("col1\tcol2");
  });

  it("should handle \\r escape", () => {
    const tokens = tokenize('"line\\rreturn"');
    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe("line\rreturn");
  });

  it("should handle \\\\ escape", () => {
    const tokens = tokenize('"back\\\\slash"');
    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe("back\\slash");
  });

  it('should handle \\" escape', () => {
    const tokens = tokenize('"say \\"hello\\""');
    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe('say "hello"');
  });

  it("should pass through unknown escapes", () => {
    const tokens = tokenize('"test\\xvalue"');
    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe("test\\xvalue");
  });

  it("should handle multiple escapes in one string", () => {
    const tokens = tokenize('"a\\nb\\tc\\\\d"');
    expect(tokens[0].value).toBe("a\nb\tc\\d");
  });
});
