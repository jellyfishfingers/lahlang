import { Token, TokenType } from "./tokens";
class TokKokError extends Error {
  constructor(msg: string, line: number) {
    super(`Tok kok lah! ${msg} (line ${line})`);
    this.name = "TokKokError";
  }
}

export type ASTNode =


| ProgramNode
  | VarDeclarationNode
  | ConstDeclarationNode
  | ReassignNode
  | PrintNode
  | PrintVerboseNode
  | IfNode
  | WhileNode
  | ForNode
  | ForEachNode
  | BreakNode
  | ContinueNode
  | FunctionDeclarationNode
  | ReturnNode
  | CallStatementNode
  | TryCatchNode
  | ThrowNode
  | WarnNode
  | AssertNode
  | ImportNode
  | ExportNode
  | StringLiteralNode
  | NumberLiteralNode
  | BooleanLiteralNode
  | NullLiteralNode
  | UndefinedLiteralNode
  | IdentifierNode
  | BinaryExprNode
  | UnaryExprNode
  | ArrayLiteralNode
  | ObjectLiteralNode
  | CallExprNode
  | ElseIfNode;
export interface ConstDeclarationNode {
  type: "ConstDeclaration";
  name: string;
  value: ASTNode;
}
export interface ReassignNode {
  type: "Reassign";
  name: string;
  value: ASTNode;
}
export interface PrintVerboseNode {
  type: "PrintVerbose";
  value: ASTNode;
}
export interface IfNode {
  type: "If";
  test: ASTNode;
  consequent: ASTNode[];
  alternates: ElseIfNode[];
  otherwise: ASTNode[] | null;
}
export interface ElseIfNode {
  type: "ElseIf";
  test: ASTNode;
  body: ASTNode[];
}
export interface WhileNode {
  type: "While";
  test: ASTNode;
  body: ASTNode[];
}
export interface ForNode {
  type: "For";
  name: string;
  start: ASTNode;
  end: ASTNode;
  body: ASTNode[];
}
export interface ForEachNode {
  type: "ForEach";
  name: string;
  arr: string;
  body: ASTNode[];
}
export interface BreakNode {
  type: "Break";
  variant: string;
}
export interface ContinueNode {
  type: "Continue";
}
export interface FunctionDeclarationNode {
  type: "FunctionDeclaration";
  name: string;
  params: string[];
  body: ASTNode[];
}
export interface ReturnNode {
  type: "Return";
  value: ASTNode;
}
export interface CallStatementNode {
  type: "CallStatement";
  name: string;
  args: ASTNode[];
}
export interface TryCatchNode {
  type: "TryCatch";
  tryBlock: ASTNode[];
  errName: string;
  catchBlock: ASTNode[];
  finallyBlock: ASTNode[] | null;
}
export interface ThrowNode {
  type: "Throw";
  variant: string;
  value: ASTNode;
}
export interface WarnNode {
  type: "Warn";
  value: ASTNode;
}
export interface AssertNode {
  type: "Assert";
  variant: string;
  value: ASTNode;
}
export interface ImportNode {
  type: "Import";
  module: string;
}
export interface ExportNode {
  type: "Export";
  name: string;
}
export interface UndefinedLiteralNode {
  type: "UndefinedLiteral";
}
export interface UnaryExprNode {
  type: "UnaryExpr";
  op: string;
  expr: ASTNode;
}
export interface ArrayLiteralNode {
  type: "ArrayLiteral";
  items: ASTNode[];
}
export interface ObjectLiteralNode {
  type: "ObjectLiteral";
  obj: { [key: string]: ASTNode };
}
export interface CallExprNode {
  type: "CallExpr";
  name: string;
  args: ASTNode[];
}

export interface ProgramNode {
  type: "Program";
  body: ASTNode[];
}
export interface VarDeclarationNode {
  type: "VarDeclaration";
  name: string;
  value: ASTNode;
}
export interface PrintNode {
  type: "Print";
  value: ASTNode;
}
export interface StringLiteralNode {
  type: "StringLiteral";
  value: string;
}
export interface NumberLiteralNode {
  type: "NumberLiteral";
  value: number;
}
export interface BooleanLiteralNode {
  type: "BooleanLiteral";
  value: boolean;
}
export interface NullLiteralNode {
  type: "NullLiteral";
}
export interface IdentifierNode {
  type: "Identifier";
  name: string;
}
export interface BinaryExprNode {
  type: "BinaryExpr";
  op: string;
  left: ASTNode;
  right: ASTNode;
}

export class Parser {
  private tokens: Token[];
  private pos: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): ProgramNode {
    this.expect(TokenType.EH_LISTEN_LAH);
    const body: ASTNode[] = [];
    while (!this.match(TokenType.OK_LAH_BYE)) {
      body.push(this.parseStatement());
    }
    this.expect(TokenType.OK_LAH_BYE);
    return { type: "Program", body };
  }

  private parseStatement(): ASTNode {
    const token = this.peek();
    switch (token.type) {
      case TokenType.EH_GOT:
        return this.parseVarDeclaration();
      case TokenType.CONFIRM_GOT:
        return this.parseConstDeclaration();
      case TokenType.EH_CHANGE:
        return this.parseReassign();
      case TokenType.OI:
        return this.parsePrint();
      case TokenType.OI_LISTEN:
        return this.parsePrintVerbose();
      case TokenType.CONFIRM_OR_NOT:
        return this.parseIf();
      case TokenType.KEEP_GOING_LAH:
        return this.parseWhile();
      case TokenType.ONE_BY_ONE_LAH:
        return this.parseFor();
      case TokenType.EVERY_ONE_ALSO:
        return this.parseForEach();
      case TokenType.SIAO_LIAO_STOP:
      case TokenType.KNN_STOP:
        return this.parseBreak();
      case TokenType.SKIP_LAH:
        return this.parseContinue();
      case TokenType.STEADY_LAH_DO_THIS:
        return this.parseFunctionDeclaration();
      case TokenType.HERE_TAKE:
        return this.parseReturn();
      case TokenType.EH_DO_THIS:
        return this.parseCallStatement();
      case TokenType.SEE_HOW_LAH:
        return this.parseTryCatch();
      case TokenType.JIALAT_THROW:
      case TokenType.CCB_THROW:
        return this.parseThrow();
      case TokenType.PAISEH_WARN:
        return this.parseWarn();
      case TokenType.HONG_GAN_LAH:
      case TokenType.CHAO_CB_ASSERT:
        return this.parseAssert();
      case TokenType.CHIONG_BRING_IN:
        return this.parseImport();
      case TokenType.SHARE_OUT:
        return this.parseExport();
      default:
        throw new TokKokError(`Unexpected token: ${token.type}`, token.line);
    }
  }

  // --- Statement Parsers ---
  private parseConstDeclaration(): ASTNode {
    this.expect(TokenType.CONFIRM_GOT);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.EQUALS);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "ConstDeclaration", name, value };
  }

  private parseReassign(): ASTNode {
    this.expect(TokenType.EH_CHANGE);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.EQUALS);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Reassign", name, value };
  }

  private parsePrintVerbose(): ASTNode {
    this.expect(TokenType.OI_LISTEN);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "PrintVerbose", value };
  }

  private parseIf(): ASTNode {
    this.expect(TokenType.CONFIRM_OR_NOT);
    this.expect(TokenType.LPAREN);
    const test = this.parseExpression();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const consequent = this.parseBlock();
    let alternates: ElseIfNode[] = [];
    while (this.match(TokenType.OR_MAYBE)) {
      this.next();
      this.expect(TokenType.LPAREN);
      const altTest = this.parseExpression();
      this.expect(TokenType.RPAREN);
      this.expect(TokenType.LBRACE);
      const altBody = this.parseBlock();
      alternates.push({ type: "ElseIf", test: altTest, body: altBody });
    }    let otherwise = null;
    if (this.match(TokenType.IF_NOT_THEN)) {
      this.next();
      this.expect(TokenType.LBRACE);
      otherwise = this.parseBlock();
    }
    return { type: "If", test, consequent, alternates, otherwise };
  }

  private parseWhile(): ASTNode {
    this.expect(TokenType.KEEP_GOING_LAH);
    this.expect(TokenType.LPAREN);
    const test = this.parseExpression();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const body = this.parseBlock();
    return { type: "While", test, body };
  }

  private parseFor(): ASTNode {
    this.expect(TokenType.ONE_BY_ONE_LAH);
    this.expect(TokenType.LPAREN);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.FROM);
    const start = this.parseExpression();
    this.expect(TokenType.TO);
    const end = this.parseExpression();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const body = this.parseBlock();
    return { type: "For", name, start, end, body };
  }

  private parseForEach(): ASTNode {
    this.expect(TokenType.EVERY_ONE_ALSO);
    this.expect(TokenType.LPAREN);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.IN);
    const arr = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const body = this.parseBlock();
    return { type: "ForEach", name, arr, body };
  }

  private parseBreak(): ASTNode {
    const token = this.next();
    this.consumeTerminator();
    return { type: "Break", variant: token.type };
  }

  private parseContinue(): ASTNode {
    this.expect(TokenType.SKIP_LAH);
    this.consumeTerminator();
    return { type: "Continue" };
  }

  private parseFunctionDeclaration(): ASTNode {
    this.expect(TokenType.STEADY_LAH_DO_THIS);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.LPAREN);
    const params = this.parseParams();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const body = this.parseBlock();
    return { type: "FunctionDeclaration", name, params, body };
  }

  private parseParams(): string[] {
    const params: string[] = [];
    while (!this.match(TokenType.RPAREN)) {
      const param = this.expect(TokenType.IDENTIFIER).value;
      params.push(param);
      if (this.match(TokenType.COMMA)) {
        this.next();
      }
    }
    return params;
  }

  private parseReturn(): ASTNode {
    this.expect(TokenType.HERE_TAKE);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Return", value };
  }

  private parseCallStatement(): ASTNode {
    this.expect(TokenType.EH_DO_THIS);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.LPAREN);
    const args = this.parseArgs();
    this.expect(TokenType.RPAREN);
    this.consumeTerminator();
    return { type: "CallStatement", name, args };
  }

  private parseArgs(): ASTNode[] {
    const args: ASTNode[] = [];
    while (!this.match(TokenType.RPAREN)) {
      args.push(this.parseExpression());
      if (this.match(TokenType.COMMA)) {
        this.next();
      }
    }
    return args;
  }

  private parseTryCatch(): ASTNode {
    this.expect(TokenType.SEE_HOW_LAH);
    this.expect(TokenType.LBRACE);
    const tryBlock = this.parseBlock();
    this.expect(TokenType.AIYOH_KENA);
    this.expect(TokenType.LPAREN);
    const errName = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const catchBlock = this.parseBlock();
    let finallyBlock = null;
    if (this.match(TokenType.CONFIRM_DO)) {
      this.next();
      this.expect(TokenType.LBRACE);
      finallyBlock = this.parseBlock();
    }
    return { type: "TryCatch", tryBlock, errName, catchBlock, finallyBlock };
  }

  private parseThrow(): ASTNode {
    const token = this.next();
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Throw", variant: token.type, value };
  }

  private parseWarn(): ASTNode {
    this.expect(TokenType.PAISEH_WARN);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Warn", value };
  }

  private parseAssert(): ASTNode {
    const token = this.next();
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Assert", variant: token.type, value };
  }

  private parseImport(): ASTNode {
    this.expect(TokenType.CHIONG_BRING_IN);
    const module = this.expect(TokenType.STRING).value;
    this.consumeTerminator();
    return { type: "Import", module };
  }

  private parseExport(): ASTNode {
    this.expect(TokenType.SHARE_OUT);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.consumeTerminator();
    return { type: "Export", name };
  }

  private parseBlock(): ASTNode[] {
    const body: ASTNode[] = [];
    while (!this.match(TokenType.RBRACE) && !this.match(TokenType.EOF)) {
      body.push(this.parseStatement());
    }
    this.expect(TokenType.RBRACE);
    return body;
  }

  // --- Expression Parsing ---
  private parseExpression(): ASTNode {
    return this.parseOrCan();
  }

  private parseOrCan(): ASTNode {
    let left = this.parseAndAlso();
    while (this.match(TokenType.OR_CAN)) {
      const op = this.expect(TokenType.OR_CAN).value;
      const right = this.parseAndAlso();
      left = { type: "BinaryExpr", op, left, right };
    }
    return left;
  }

  private parseAndAlso(): ASTNode {
    let left = this.parseEquality();
    while (this.match(TokenType.AND_ALSO)) {
      const op = this.expect(TokenType.AND_ALSO).value;
      const right = this.parseEquality();
      left = { type: "BinaryExpr", op, left, right };
    }
    return left;
  }

  private parseEquality(): ASTNode {
    let left = this.parseComparison();
    while (this.match(TokenType.SAME_SAME) || this.match(TokenType.NOT_SAME)) {
      const op = this.next().value;
      const right = this.parseComparison();
      left = { type: "BinaryExpr", op, left, right };
    }
    return left;
  }

  private parseComparison(): ASTNode {
    let left = this.parseAddSub();
    while (
      this.match(TokenType.MORE_THAN) ||
      this.match(TokenType.LESS_THAN) ||
      this.match(TokenType.MORE_THAN_EQUAL) ||
      this.match(TokenType.LESS_THAN_EQUAL)
    ) {
      const op = this.next().value;
      const right = this.parseAddSub();
      left = { type: "BinaryExpr", op, left, right };
    }
    return left;
  }

  private parseAddSub(): ASTNode {
    let left = this.parseMulDivMod();
    while (this.match(TokenType.PLUS) || this.match(TokenType.MINUS)) {
      const op = this.next().value;
      const right = this.parseMulDivMod();
      left = { type: "BinaryExpr", op, left, right };
    }
    return left;
  }

  private parseMulDivMod(): ASTNode {
    let left = this.parseUnary();
    while (
      this.match(TokenType.MULTIPLY) ||
      this.match(TokenType.DIVIDE) ||
      this.match(TokenType.MODULO)
    ) {
      const op = this.next().value;
      const right = this.parseUnary();
      left = { type: "BinaryExpr", op, left, right };
    }
    return left;
  }

  private parseUnary(): ASTNode {
    if (this.match(TokenType.DUN_WANT)) {
      const op = this.expect(TokenType.DUN_WANT).value;
      const expr = this.parseUnary();
      return { type: "UnaryExpr", op, expr };
    }
    if (this.match(TokenType.MINUS)) {
      const op = this.expect(TokenType.MINUS).value;
      const expr = this.parseUnary();
      return { type: "UnaryExpr", op, expr };
    }
    return this.parsePrimary();
  }

  private parsePrimary(): ASTNode {
    const token = this.peek();
    // Literals
    switch (token.type) {
      case TokenType.STRING:
        this.next();
        return { type: "StringLiteral", value: token.value };
      case TokenType.NUMBER:
        this.next();
        return { type: "NumberLiteral", value: Number(token.value) };
      case TokenType.CAN:
        this.next();
        return { type: "BooleanLiteral", value: true };
      case TokenType.CANNOT:
        this.next();
        return { type: "BooleanLiteral", value: false };
      case TokenType.BO_JIO:
        this.next();
        return { type: "NullLiteral" };
      case TokenType.BLUR_BLUR:
        this.next();
        return { type: "UndefinedLiteral" };
      case TokenType.IDENTIFIER:
        // Function call or variable
        const id = this.next().value;
        if (this.match(TokenType.LPAREN)) {
          this.next();
          const args = this.parseArgs();
          this.expect(TokenType.RPAREN);
          return { type: "CallExpr", name: id, args };
        }
        return { type: "Identifier", name: id };
      case TokenType.LPAREN:
        this.next();
        const expr = this.parseExpression();
        this.expect(TokenType.RPAREN);
        return expr;
      case TokenType.LBRACKET:
        this.next();
        const items = this.parseArrayItems();
        this.expect(TokenType.RBRACKET);
        return { type: "ArrayLiteral", items };
      case TokenType.LBRACE:
        this.next();
        const obj = this.parseObjectItems();
        this.expect(TokenType.RBRACE);
        return { type: "ObjectLiteral", obj };
      default:
        throw new TokKokError(
          `Unexpected primary token: ${token.type}`,
          token.line,
        );
    }
  }

  private parseArrayItems(): ASTNode[] {
    const items: ASTNode[] = [];
    while (!this.match(TokenType.RBRACKET)) {
      items.push(this.parseExpression());
      if (this.match(TokenType.COMMA)) {
        this.next();
      }
    }
    return items;
  }

  private parseObjectItems(): { [key: string]: ASTNode } {
    const obj: { [key: string]: ASTNode } = {};
    while (!this.match(TokenType.RBRACE)) {
      const key = this.expect(TokenType.IDENTIFIER).value;
      this.expect(TokenType.COLON);
      const value = this.parseExpression();
      obj[key] = value;
      if (this.match(TokenType.COMMA)) {
        this.next();
      }
    }
    return obj;
  }

  private parseVarDeclaration(): VarDeclarationNode {
    this.expect(TokenType.EH_GOT);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.EQUALS);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "VarDeclaration", name, value };
  }

  private parsePrint(): PrintNode {
    this.expect(TokenType.OI);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Print", value };
  }

  private consumeTerminator(): void {
    if (this.match(TokenType.SEMICOLON) || this.match(TokenType.LAH)) {
      this.next();
    }
  }

  private expect(type: TokenType): Token {
    const token = this.next();
    if (token.type !== type) {
      throw new TokKokError(`Expected ${type}, got ${token.type}`, token.line);
    }
    return token;
  }

  private match(type: TokenType): boolean {
    return this.peek().type === type;
  }

  private peek(): Token {
    return this.tokens[this.pos];
  }

  private next(): Token {
    return this.tokens[this.pos++];
  }
}
