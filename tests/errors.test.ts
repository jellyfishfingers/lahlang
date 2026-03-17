import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';
import { Interpreter } from '../src/interpreter';

describe('Error Handling', () => {
  let logSpy: any;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should handle try-catch (see how lah ... aiyoh kena)', () => {
    const source = `eh listen lah
      see how lah {
        jialat throw "something wrong";
      } aiyoh kena (err) {
        oi "caught error";
      }
    ok lah bye`;
    
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    interpreter.run(ast);

    expect(logSpy).toHaveBeenCalledWith('caught error');
  });

  it('should handle finally block (confirm do)', () => {
    const source = `eh listen lah
      see how lah {
        oi "try";
      } aiyoh kena (err) {
        oi "catch";
      } confirm do {
        oi "finally";
      }
    ok lah bye`;
    
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    interpreter.run(ast);

    expect(logSpy).toHaveBeenCalledWith('try');
    expect(logSpy).toHaveBeenCalledWith('finally');
  });

  it('should handle assertions (hong gan lah)', () => {
    const source = `eh listen lah
      hong gan lah (1 same same 1);
    ok lah bye`;
    
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    
    expect(() => interpreter.run(ast)).not.toThrow();
  });

  it('should throw on failed assertions', () => {
    const source = `eh listen lah
      hong gan lah (1 same same 2);
    ok lah bye`;
    
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit'); });

    expect(() => interpreter.run(ast)).toThrow('process.exit');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('GONE CASE LAH'));
  });
});
