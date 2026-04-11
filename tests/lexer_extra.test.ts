import { describe, it, expect } from 'vitest';
import { Lexer } from '../src/lexer';
import { TokenType } from '../src/tokens';

describe('Lexer - Comprehensive', () => {
  it('should tokenize all keywords', () => {
    const source = `eh listen lah eh got confirm got eh change can cannot bo jio blur blur
      oi oi listen ask lah confirm or not or maybe abuden which one lah if it's last resort
      keep going lah one by one lah every one also from to in siao liao stop knn stop skip lah
      steady lah do this here take eh do this one time only see how lah aiyoh kena confirm do
      jialat throw paiseh warn hong gan lah cb lah ccb throw kan ni na crash chao cb assert
      puki panic si beh babi input words nombor can cannot whole list all the things
      chiong bring in share out eh check this old liao ok lah bye`;
    
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    
    // Check a few key ones to ensure greedy matching worked
    expect(tokens.find(t => t.type === TokenType.EH_LISTEN_LAH)).toBeDefined();
    expect(tokens.find(t => t.type === TokenType.OI_LISTEN)).toBeDefined();
    expect(tokens.find(t => t.type === TokenType.KNN_STOP)).toBeDefined();
    expect(tokens.find(t => t.type === TokenType.CHAO_CB_ASSERT)).toBeDefined();
    expect(tokens.find(t => t.type === TokenType.OK_LAH_BYE)).toBeDefined();
  });

  it('should handle numbers (integers and floats)', () => {
    const source = `123 45.67 .89`;
    const lexer = new Lexer(source);
    // .89 should be DOT then NUMBER 89 because the lexer expects digit first for number
    const tokens = lexer.tokenize();
    expect(tokens[0].type).toBe(TokenType.NUMBER);
    expect(tokens[0].value).toBe('123');
    expect(tokens[1].type).toBe(TokenType.NUMBER);
    expect(tokens[1].value).toBe('45.67');
    expect(tokens[2].type).toBe(TokenType.DOT);
    expect(tokens[3].type).toBe(TokenType.NUMBER);
  });

  it('should handle strings with spaces and special chars', () => {
    const source = `"hello world !@#$%^&*()"`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    expect(tokens[0].type).toBe(TokenType.STRING);
    expect(tokens[0].value).toBe('hello world !@#$%^&*()');
  });

  it('should handle all operators', () => {
    const source = `+ - * / % = same same not same more than or same less than or same and also or can dun want ! add some more minus a bit`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    
    const types = tokens.map(t => t.type);
    expect(types).toContain(TokenType.PLUS);
    expect(types).toContain(TokenType.SAME_SAME);
    expect(types).toContain(TokenType.MORE_THAN_EQUAL);
    expect(types).toContain(TokenType.ADD_SOME_MORE);
  });

  it('should handle identifiers with underscores and numbers', () => {
    const source = `my_var_1 _temp count2`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    expect(tokens[0].value).toBe('my_var_1');
    expect(tokens[1].value).toBe('_temp');
    expect(tokens[2].value).toBe('count2');
  });

  it('should throw on unterminated strings', () => {
    const source = `"unclosed string`;
    const lexer = new Lexer(source);
    expect(() => lexer.tokenize()).toThrow();
  });
});
