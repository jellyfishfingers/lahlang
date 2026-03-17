import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';
import { Interpreter } from '../src/interpreter';
import * as fs from 'fs';
import * as path from 'path';

describe('Integration Tests', () => {
  let logSpy: any;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  const runFile = (filePath: string) => {
    const source = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf-8');
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    interpreter.run(ast);
  };

  it('should run hello.lah', () => {
    runFile('examples/1. hello.lah');
    expect(logSpy).toHaveBeenCalledWith('Hello World');
    expect(logSpy).toHaveBeenCalledWith(0);
    expect(logSpy).toHaveBeenCalledWith('b is equal to zero');
    expect(logSpy).toHaveBeenCalledWith(1);
    expect(logSpy).toHaveBeenCalledWith(2);
    expect(logSpy).toHaveBeenCalledWith(3);
    expect(logSpy).toHaveBeenCalledWith('b is equal to a');
    expect(logSpy).toHaveBeenCalledWith(4);
  });

  it('should run fizzbuzz.lah', () => {
    logSpy.mockClear();
    runFile('examples/2. fizzbuzz.lah');
    // Check some specific outputs
    expect(logSpy).toHaveBeenCalledWith('FizzBuzz'); // for 15
    expect(logSpy).toHaveBeenCalledWith('Fizz');     // for 3
    expect(logSpy).toHaveBeenCalledWith('Buzz');     // for 5
    expect(logSpy).toHaveBeenCalledWith(1);
    expect(logSpy).toHaveBeenCalledWith(2);
  });

  it('should run fibonacci.lah', () => {
    logSpy.mockClear();
    runFile('examples/3. fibonacci.lah');
    // Fibonacci sequence up to 7 is: 0, 1, 1, 2, 3, 5, 8, 13
    expect(logSpy).toHaveBeenCalledWith(13);
  });
  
  it('should run data_structures.lah', () => {
    logSpy.mockClear();
    runFile('examples/4. data_structures.lah');
    // Just ensure it doesn't crash and prints something
    expect(logSpy).toHaveBeenCalled();
  });
});
