import { Token, TokenType, KEYWORDS } from "./tokens";
import { TokKokError } from "./errors";

export class Lexer {
  private source: string;
  private pos: number = 0;
  private line: number = 1;
  private col: number = 1;

  constructor(source: string) {
    this.source = source;
  }

  tokenize(): Token[] {
    const tokens: Token[] = [];
    while (this.pos < this.source.length) {
      const ch = this.currentChar();

      // Skip whitespace
      if (this.isWhitespace(ch)) {
        this.skipWhitespace();
        continue;
      }

      // Single-line comment
      if (this.source.startsWith("// shiok:", this.pos)) {
        const startCol = this.col;
        this.pos += 9;
        this.col += 9;
        let comment = "";
        while (this.pos < this.source.length && this.currentChar() !== "\n") {
          comment += this.currentChar();
          this.pos++;
          this.col++;
        }
        tokens.push({
          type: TokenType.COMMENT,
          value: comment.trim(),
          line: this.line,
          col: startCol,
        });
        continue;
      }

      // Multi-line comment
      if (this.source.startsWith("wahlau start", this.pos)) {
        const startCol = this.col;
        const startLine = this.line;
        this.pos += "wahlau start".length;
        this.col += "wahlau start".length;
        let comment = "";
        while (
          this.pos < this.source.length &&
          !this.source.startsWith("wahlau end", this.pos)
        ) {
          if (this.currentChar() === "\n") {
            comment += this.currentChar();
            this.pos++;
            this.line++;
            this.col = 1;
          } else {
            comment += this.currentChar();
            this.pos++;
            this.col++;
          }
        }
        if (this.source.startsWith("wahlau end", this.pos)) {
          this.pos += "wahlau end".length;
          this.col += "wahlau end".length;
        }
        tokens.push({
          type: TokenType.MULTILINE_COMMENT,
          value: comment.trim(),
          line: startLine,
          col: startCol,
        });
        continue;
      }

      // String literal
      if (ch === '"') {
        const startCol = this.col;
        this.pos++;
        this.col++;
        let str = "";
        while (this.pos < this.source.length && this.currentChar() !== '"') {
          if (this.currentChar() === "\n") {
             throw new TokKokError("Unterminated string literal lah!", this.line, this.col);
          }
          str += this.currentChar();
          this.pos++;
          this.col++;
        }
        if (this.pos < this.source.length && this.currentChar() === '"') {
          this.pos++;
          this.col++;
        } else {
           throw new TokKokError("Unterminated string literal lah!", this.line, this.col);
        }
        tokens.push({
          type: TokenType.STRING,
          value: str,
          line: this.line,
          col: startCol,
        });
        continue;
      }

      // Number literal
      if (this.isDigit(ch)) {
        const startCol = this.col;
        let num = "";
        while (
          this.pos < this.source.length &&
          this.isDigit(this.currentChar())
        ) {
          num += this.currentChar();
          this.pos++;
          this.col++;
        }
        // Float
        if (this.pos < this.source.length && this.currentChar() === ".") {
          num += ".";
          this.pos++;
          this.col++;
          while (
            this.pos < this.source.length &&
            this.isDigit(this.currentChar())
          ) {
            num += this.currentChar();
            this.pos++;
            this.col++;
          }
        }
        tokens.push({
          type: TokenType.NUMBER,
          value: num,
          line: this.line,
          col: startCol,
        });
        continue;
      }

      // Greedy keyword matching with word boundaries
      let matched = false;
      for (const [kw, type] of KEYWORDS) {
        if (this.source.startsWith(kw, this.pos)) {
          // Check if this is a word keyword and if it's followed by an identifier character
          const nextCharPos = this.pos + kw.length;
          const isWord = /[a-z_]/i.test(kw[kw.length - 1]);
          
          if (isWord && nextCharPos < this.source.length) {
            const nextChar = this.source[nextCharPos];
            if (this.isIdentifierPart(nextChar)) {
              // It's a prefix of a longer word, not a keyword match
              continue;
            }
          }

          tokens.push({
            type,
            value: kw,
            line: this.line,
            col: this.col,
          });
          this.pos += kw.length;
          this.col += kw.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;

      // Identifier
      if (this.isIdentifierStart(ch)) {
        const startCol = this.col;
        let id = "";
        while (
          this.pos < this.source.length &&
          this.isIdentifierPart(this.currentChar())
        ) {
          id += this.currentChar();
          this.pos++;
          this.col++;
        }
        tokens.push({
          type: TokenType.IDENTIFIER,
          value: id,
          line: this.line,
          col: startCol,
        });
        continue;
      }

      // Single-char punctuation
      const punctMap: { [ch: string]: TokenType } = {
        "(": TokenType.LPAREN,
        ")": TokenType.RPAREN,
        "{": TokenType.LBRACE,
        "}": TokenType.RBRACE,
        "[": TokenType.LBRACKET,
        "]": TokenType.RBRACKET,
        ",": TokenType.COMMA,
        ".": TokenType.DOT,
        ":": TokenType.COLON,
        ";": TokenType.SEMICOLON,
        "=": TokenType.EQUALS,
        "+": TokenType.PLUS,
        "-": TokenType.MINUS,
        "*": TokenType.MULTIPLY,
        "/": TokenType.DIVIDE,
        "%": TokenType.MODULO,
        "!": TokenType.DUN_WANT,
      };
      if (punctMap[ch]) {
        tokens.push({
          type: punctMap[ch],
          value: ch,
          line: this.line,
          col: this.col,
        });
        this.pos++;
        this.col++;
        continue;
      }

      // Unrecognised character
      throw new TokKokError(`Eh what is this character: '${ch}'?`, this.line, this.col);
    }
    // EOF token
    tokens.push({
      type: TokenType.EOF,
      value: "",
      line: this.line,
      col: this.col,
    });
    return tokens;
  }

  private currentChar(): string {
    return this.source[this.pos];
  }

  private isWhitespace(ch: string): boolean {
    return ch === " " || ch === "\t" || ch === "\r" || ch === "\n";
  }

  private skipWhitespace(): void {
    while (
      this.pos < this.source.length &&
      this.isWhitespace(this.currentChar())
    ) {
      if (this.currentChar() === "\n") {
        this.line++;
        this.col = 1;
      } else {
        this.col++;
      }
      this.pos++;
    }
  }

  private isDigit(ch: string): boolean {
    return ch >= "0" && ch <= "9";
  }

  private isIdentifierStart(ch: string): boolean {
    return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_";
  }

  private isIdentifierPart(ch: string): boolean {
    return this.isIdentifierStart(ch) || this.isDigit(ch);
  }
}

