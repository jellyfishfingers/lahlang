import { describe, it, expect, vi } from "vitest";
import { Lexer } from "../src/lexer";
import { Parser } from "../src/parser";
import { Interpreter } from "../src/interpreter";
import { TokenType } from "../src/tokens";

describe("Full Token Implementation Tests", () => {
  it("should tokenize and parse error type literals", () => {
    const source = `eh listen lah
      eh got err = JialatError;
      eh got err2 = BoJioError;
      eh got err3 = SiaoError;
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    const interpreter = new Interpreter();
    interpreter.run(ast);
    // No error means it parsed and evaluated successfully
  });

  it("should tokenize and parse type literals", () => {
    const source = `eh listen lah
      eh got t1 = words;
      eh got t2 = nombor;
      eh got t3 = can cannot;
      eh got t4 = whole list;
      eh got t5 = all the things;
      oi t1;
      oi t2;
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    const consoleSpy = vi.spyOn(console, "log");
    const interpreter = new Interpreter();
    interpreter.run(ast);

    expect(consoleSpy).toHaveBeenCalledWith("WORDS");
    expect(consoleSpy).toHaveBeenCalledWith("NOMBOR");
    consoleSpy.mockRestore();
  });

  it("should handle OLD_LIAO (deprecation) warning", () => {
    const source = `eh listen lah
      old liao eh got x = 10;
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    const warnSpy = vi.spyOn(console, "warn");
    const interpreter = new Interpreter();
    interpreter.run(ast);

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("[OLD LIAO]"),
    );
    warnSpy.mockRestore();
  });

  it("should skip comments and multiline comments", () => {
    const source = `eh listen lah
      // shiok: this is a comment
      eh got x = 5; // shiok: another comment
      wahlau start
        this is a
        multiline comment
      wahlau end
      oi x;
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    
    // Ensure comment tokens are produced
    expect(tokens.some(t => t.type === TokenType.COMMENT)).toBe(true);
    expect(tokens.some(t => t.type === TokenType.MULTILINE_COMMENT)).toBe(true);

    const parser = new Parser(tokens);
    const ast = parser.parse();

    const consoleSpy = vi.spyOn(console, "log");
    const interpreter = new Interpreter();
    interpreter.run(ast);

    expect(consoleSpy).toHaveBeenCalledWith(5);
    consoleSpy.mockRestore();
  });

  it("should handle all error type literals", () => {
    const errorTypes = [
      "JialatError", "BoJioError", "SiaoError", "TokKokError",
      "TanKuKuError", "SuayError", "WahLauError", "GoneCase",
      "CbError", "LanJiaoError", "CcbError", "ChaoCbError"
    ];
    const source = `eh listen lah
      ${errorTypes.map((t, i) => `eh got e${i} = ${t};`).join("\n")}
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    const interpreter = new Interpreter();
    interpreter.run(ast);
  });

  it("should handle all type literals", () => {
    const types = [
      "words", "nombor", "can cannot", "whole list", "all the things"
    ];
    const source = `eh listen lah
      ${types.map((t, i) => `eh got t${i} = ${t};`).join("\n")}
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    const interpreter = new Interpreter();
    interpreter.run(ast);
  });

  it("should handle CHIONG_BRING_IN and SHARE_OUT", () => {
    const source = `eh listen lah
      chiong bring in "path";
      share out x;
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    const interpreter = new Interpreter();
    // We expect this not to throw if path can be required
    interpreter.run(ast);
  });
});
