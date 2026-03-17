import { describe, it, expect } from 'vitest';
import { Lexer } from '../src/lexer';
import { TokenType } from '../src/tokens';

describe('Lexer', () => {
  it('should tokenize basic program structure', () => {
    const source = `eh listen lah
      ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe(TokenType.EH_LISTEN_LAH);
    expect(tokens[1].type).toBe(TokenType.OK_LAH_BYE);
    expect(tokens[2].type).toBe(TokenType.EOF);
  });

  it('should tokenize variable declarations', () => {
    const source = `eh got a = 1;
      confirm got b = "hello";`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe(TokenType.EH_GOT);
    expect(tokens[1].value).toBe('a');
    expect(tokens[2].type).toBe(TokenType.EQUALS);
    expect(tokens[3].type).toBe(TokenType.NUMBER);
    expect(tokens[3].value).toBe('1');
    expect(tokens[4].type).toBe(TokenType.SEMICOLON);

    expect(tokens[5].type).toBe(TokenType.CONFIRM_GOT);
    expect(tokens[6].value).toBe('b');
    expect(tokens[7].type).toBe(TokenType.EQUALS);
    expect(tokens[8].type).toBe(TokenType.STRING);
    expect(tokens[8].value).toBe('hello');
  });

  it('should handle multi-word operators greedily', () => {
    const source = `a same same b
      c more than or same d`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[1].type).toBe(TokenType.SAME_SAME);
    expect(tokens[4].type).toBe(TokenType.MORE_THAN_EQUAL);
    expect(tokens[5].value).toBe('d');
  });

  it('should handle comments', () => {
    const source = `// shiok: this is a comment
      eh got a = 1;
      wahlau start
        this is multi-line
      wahlau end
      ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe(TokenType.COMMENT);
    expect(tokens[1].type).toBe(TokenType.EH_GOT);
    expect(tokens[6].type).toBe(TokenType.MULTILINE_COMMENT);
    expect(tokens[7].type).toBe(TokenType.OK_LAH_BYE);
  });

  it('should throw TokKokError for unknown characters', () => {
    const source = `eh listen lah
      @
      ok lah bye`;
    const lexer = new Lexer(source);
    expect(() => lexer.tokenize()).toThrow(/Tok kok lah/);
  });

  it('should handle "lah" as a terminator', () => {
    const source = `eh listen lah
      oi "hello" lah
      ok lah bye`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe(TokenType.EH_LISTEN_LAH);
    expect(tokens[1].type).toBe(TokenType.OI);
    expect(tokens[3].type).toBe(TokenType.LAH);
    expect(tokens[4].type).toBe(TokenType.OK_LAH_BYE);
  });
});
