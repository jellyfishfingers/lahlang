import { describe, it, expect } from 'vitest';
import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';
import { TokenType } from '../src/tokens';

describe('Parser', () => {
  it('should parse a basic program', () => {
    const source = `eh listen lah
      oi "hello";
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    expect(ast.type).toBe('Program');
    expect(ast.body.length).toBe(1);
    expect(ast.body[0].type).toBe('Print');
    expect((ast.body[0] as any).value.type).toBe('StringLiteral');
    expect((ast.body[0] as any).value.value).toBe('hello');
  });

  it('should parse variable declarations', () => {
    const source = `eh listen lah
      eh got a = 1;
      confirm got b = "test";
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    expect(ast.body[0].type).toBe('VarDeclaration');
    expect((ast.body[0] as any).name).toBe('a');
    expect(ast.body[1].type).toBe('ConstDeclaration');
    expect((ast.body[1] as any).name).toBe('b');
  });

  it('should parse complex if-else-if-else', () => {
    const source = `eh listen lah
      confirm or not (a same same 1) {
        oi "one";
      } or maybe (a same same 2) {
        oi "two";
      } if not then {
        oi "other";
      }
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    const ifNode = ast.body[0] as any;
    expect(ifNode.type).toBe('If');
    expect(ifNode.test.type).toBe('BinaryExpr');
    expect(ifNode.test.op).toBe('same same');
    expect(ifNode.alternates.length).toBe(1);
    expect(ifNode.alternates[0].type).toBe('ElseIf');
    expect(ifNode.otherwise).not.toBeNull();
  });

  it('should parse while loops', () => {
    const source = `eh listen lah
      keep going lah (i less than 10) {
        oi i;
      }
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    expect(ast.body[0].type).toBe('While');
    expect((ast.body[0] as any).test.op).toBe('less than');
  });

  it('should parse expressions with precedence', () => {
    const source = `eh listen lah
      eh got x = 1 + 2 * 3;
    ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();

    const decl = ast.body[0] as any;
    expect(decl.value.type).toBe('BinaryExpr');
    expect(decl.value.op).toBe('+');
    expect(decl.value.right.type).toBe('BinaryExpr');
    expect(decl.value.right.op).toBe('*');
  });
});
