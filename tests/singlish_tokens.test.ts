import { describe, it, expect } from "vitest";
import { Lexer } from "../src/lexer";
import { TokenType } from "../src/tokens";

describe("New Singlish Tokens", () => {
  const tokenize = (src: string) => new Lexer(src).tokenize();

  it("should tokenize sian", () => {
    const tokens = tokenize("sian 100");
    expect(tokens[0].type).toBe(TokenType.SIAN);
  });

  it("should tokenize lepak", () => {
    const tokens = tokenize("lepak 200");
    expect(tokens[0].type).toBe(TokenType.LEPAK);
  });

  it("should tokenize chope", () => {
    const tokens = tokenize("chope myVar");
    expect(tokens[0].type).toBe(TokenType.CHOPE);
  });

  it("should tokenize die die must", () => {
    const tokens = tokenize("die die must can");
    expect(tokens[0].type).toBe(TokenType.DIE_DIE_MUST);
  });

  it("should tokenize kaypoh", () => {
    const tokens = tokenize("kaypoh x");
    expect(tokens[0].type).toBe(TokenType.KAYPOH);
  });

  it("should tokenize gostan", () => {
    const tokens = tokenize("gostan arr");
    expect(tokens[0].type).toBe(TokenType.GOSTAN);
  });

  it("should tokenize swee", () => {
    const tokens = tokenize("swee myObj");
    expect(tokens[0].type).toBe(TokenType.SWEE);
  });

  it("should tokenize agak agak", () => {
    const tokens = tokenize("agak agak 3.5");
    expect(tokens[0].type).toBe(TokenType.AGAK_AGAK);
  });

  it("should tokenize act blur", () => {
    const tokens = tokenize("act blur {");
    expect(tokens[0].type).toBe(TokenType.ACT_BLUR);
  });

  it("should tokenize makan", () => {
    const tokens = tokenize("makan arr");
    expect(tokens[0].type).toBe(TokenType.MAKAN);
  });

  it("should tokenize tabao", () => {
    const tokens = tokenize("tabao arr");
    expect(tokens[0].type).toBe(TokenType.TABAO);
  });

  it("should tokenize sabo", () => {
    const tokens = tokenize("sabo myVar");
    expect(tokens[0].type).toBe(TokenType.SABO);
  });

  it("should tokenize hantam lah", () => {
    const tokens = tokenize("hantam lah {");
    expect(tokens[0].type).toBe(TokenType.HANTAM_LAH);
  });

  it("should tokenize until", () => {
    const tokens = tokenize("until (x)");
    expect(tokens[0].type).toBe(TokenType.UNTIL);
  });

  it("should tokenize jio", () => {
    const tokens = tokenize("jio myFunc(1)");
    expect(tokens[0].type).toBe(TokenType.JIO);
  });

  it("should not match partial keywords", () => {
    const tokens = tokenize("sianly kaypohness");
    expect(tokens[0].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[0].value).toBe("sianly");
    expect(tokens[1].type).toBe(TokenType.IDENTIFIER);
    expect(tokens[1].value).toBe("kaypohness");
  });
});
