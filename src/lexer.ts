import { Token, TokenType } from "./tokens";

export class Lexer {
  private source: string;
  private pos: number = 0;
  private line: number = 1;
  private tokens: Token[] = [];

  constructor(source: string) {
    this.source = source;
  }

  tokenize(): Token[] {
    // TODO: implement tokenisation
    // Walk through source char by char,
    // match Lahlang keywords and produce tokens
    return this.tokens;
  }
}
