import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';
import { Interpreter } from '../src/interpreter';

describe('Interpreter - Edge Cases & Complex Logic', () => {
  let logSpy: any;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  const run = (source: string) => {
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    interpreter.run(ast);
  };

  it('should handle nested loops with break and continue', () => {
    const source = `eh listen lah
      eh got count = 0;
      one by one lah (i from 1 to 3) {
        one by one lah (j from 1 to 3) {
          confirm or not (j same same 2) {
            skip lah;
          }
          eh change count = count + 1;
        }
      }
      oi count;
    ok lah bye`;
    run(source);
    // 3 * 2 = 6 (j=1, j=3 for each i)
    expect(logSpy).toHaveBeenCalledWith(6);
  });

  it('should handle recursion and closures', () => {
    const source = `eh listen lah
      steady lah do this makeCounter(start) {
        eh got c = start;
        here take one time only () {
          eh change c = c + 1;
          here take c;
        };
      }

      eh got counter = makeCounter(10);
      oi counter();
      oi counter();
    ok lah bye`;
    run(source);
    expect(logSpy).toHaveBeenCalledWith(11);
    expect(logSpy).toHaveBeenCalledWith(12);
  });

  it('should handle array and object manipulation', () => {
    const source = `eh listen lah
      eh got list = [1, 2, 3];
      eh got obj = { a: 1, b: "two" };
      oi list;
      oi obj;
    ok lah bye`;
    run(source);
    expect(logSpy).toHaveBeenCalledWith([1, 2, 3]);
    expect(logSpy).toHaveBeenCalledWith({ a: 1, b: "two" });
  });

  it('should handle logical operators short-circuiting', () => {
    const source = `eh listen lah
      eh got x = can or can (can); // shiok: can is true
      oi x;
      eh got y = cannot and also (can);
      oi y;
    ok lah bye`;
    run(source);
    expect(logSpy).toHaveBeenCalledWith(true);
    expect(logSpy).toHaveBeenCalledWith(false);
  });

  it('should handle deep nesting', () => {
    const source = `eh listen lah
      confirm or not (can) {
        confirm or not (can) {
          confirm or not (can) {
            oi "deep";
          }
        }
      }
    ok lah bye`;
    run(source);
    expect(logSpy).toHaveBeenCalledWith("deep");
  });
});
