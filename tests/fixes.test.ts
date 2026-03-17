import { describe, it, expect, vi } from 'vitest';
import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';
import { Interpreter } from '../src/interpreter';

describe('Fixes and New Features', () => {
  const run = (source: string) => {
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    return interpreter.run(ast);
  };

  it('should support member access (dot access)', () => {
    const source = `eh listen lah
      eh got my_obj = { foo: "bar" };
      oi my_obj.foo;
    ok lah bye`;
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    run(source);
    expect(logSpy).toHaveBeenCalledWith('bar');
    logSpy.mockRestore();
  });

  it('should support member assignment', () => {
    const source = `eh listen lah
      eh got my_obj = { foo: "bar" };
      eh change my_obj.foo = "baz";
      oi my_obj.foo;
    ok lah bye`;
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    run(source);
    expect(logSpy).toHaveBeenCalledWith('baz');
    logSpy.mockRestore();
  });

  it('should support ADD_SOME_MORE (+=) and MINUS_A_BIT (-=) on identifiers', () => {
    const source = `eh listen lah
      eh got x = 10;
      add some more x = 5;
      oi x;
      minus a bit x = 3;
      oi x;
    ok lah bye`;
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    run(source);
    expect(logSpy).toHaveBeenCalledWith(15);
    expect(logSpy).toHaveBeenCalledWith(12);
    logSpy.mockRestore();
  });

  it('should support ADD_SOME_MORE (+=) on members', () => {
    const source = `eh listen lah
      eh got my_obj = { score: 10 };
      add some more my_obj.score = 5;
      oi my_obj.score;
    ok lah bye`;
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    run(source);
    expect(logSpy).toHaveBeenCalledWith(15);
    logSpy.mockRestore();
  });

  it('should allow expressions in every one also (ForEach)', () => {
    const source = `eh listen lah
      every one also (item in [1, 2, 3]) {
        oi item;
      }
    ok lah bye`;
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    run(source);
    expect(logSpy).toHaveBeenCalledWith(1);
    expect(logSpy).toHaveBeenCalledWith(2);
    expect(logSpy).toHaveBeenCalledWith(3);
    logSpy.mockRestore();
  });

  it('should handle BinaryExpr + with Error objects', () => {
    const source = `eh listen lah
      see how lah {
        jialat throw "something wrong";
      } aiyoh kena (e) {
        oi "Caught: " + e;
      }
    ok lah bye`;
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    run(source);
    expect(logSpy).toHaveBeenCalledWith('Caught: something wrong');
    logSpy.mockRestore();
  });
});
