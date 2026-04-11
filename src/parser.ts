import { Token, TokenType } from "./tokens";
import { TokKokError } from "./errors";

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
  | ErrorLiteralNode
  | TypeLiteralNode
  | IdentifierNode
  | BinaryExprNode
  | UnaryExprNode
  | ArrayLiteralNode
  | ObjectLiteralNode
  | CallExprNode
  | ElseIfNode
  | SwitchNode
  | SwitchCaseNode
  | AnonymousFunctionNode
  | CheckNode
  | InputNode
  | MemberExprNode;

export interface ErrorLiteralNode {
  type: "ErrorLiteral";
  variant: TokenType;
}

export interface TypeLiteralNode {
  type: "TypeLiteral";
  variant: TokenType;
}

export interface CheckNode {
  type: "Check";
  value: ASTNode;
  isIntense?: boolean;
  isDeprecated?: boolean;
}

export interface InputNode {
  type: "Input";
  prompt: ASTNode;
  isIntense?: boolean;
  isDeprecated?: boolean;
}

export interface MemberExprNode {
  type: "MemberExpr";
  object: ASTNode;
  property: string;
}

export interface SwitchNode {
  type: "Switch";
  discriminant: ASTNode;
  cases: SwitchCaseNode[];
  defaultCase: ASTNode[] | null;
}

export interface SwitchCaseNode {
  type: "SwitchCase";
  test: ASTNode;
  consequent: ASTNode[];
}

export interface AnonymousFunctionNode {
  type: "AnonymousFunction";
  params: string[];
  body: ASTNode[];
}
export interface ConstDeclarationNode {
  type: "ConstDeclaration";
  name: string;
  value: ASTNode;
}
export interface ReassignNode {
  type: "Reassign";
  target: ASTNode;
  value: ASTNode;
  op: string; // "=" or "+=" or "-="
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
  arr: ASTNode;
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
  isIntense?: boolean;
  isDeprecated?: boolean;
}
export interface PrintNode {
  type: "Print";
  value: ASTNode;
  isIntense?: boolean;
  isDeprecated?: boolean;
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
    while (!this.match(TokenType.OK_LAH_BYE) && !this.match(TokenType.EOF)) {
      body.push(this.parseStatement());
    }
    this.expect(TokenType.OK_LAH_BYE);
    return { type: "Program", body };
  }

  private parseStatement(): ASTNode {
    let intense = false;
    let deprecated = false;

    while (this.match(TokenType.SI_BEH) || this.match(TokenType.OLD_LIAO)) {
      if (this.match(TokenType.SI_BEH)) {
        this.next();
        intense = true;
      } else {
        this.next();
        deprecated = true;
      }
    }

    const token = this.peek();
    let node: ASTNode;
    switch (token.type) {
      case TokenType.EH_GOT:
        node = this.parseVarDeclaration();
        break;
      case TokenType.CONFIRM_GOT:
        node = this.parseConstDeclaration();
        break;
      case TokenType.EH_CHANGE:
      case TokenType.ADD_SOME_MORE:
      case TokenType.MINUS_A_BIT:
        node = this.parseReassign();
        break;
      case TokenType.OI:
        node = this.parsePrint();
        break;
      case TokenType.OI_LISTEN:
        node = this.parsePrintVerbose();
        break;
      case TokenType.CONFIRM_OR_NOT:
        node = this.parseIf();
        break;
      case TokenType.WHICH_ONE_LAH:
        node = this.parseSwitch();
        break;
      case TokenType.KEEP_GOING_LAH:
        node = this.parseWhile();
        break;
      case TokenType.ONE_BY_ONE_LAH:
        node = this.parseFor();
        break;
      case TokenType.EVERY_ONE_ALSO:
        node = this.parseForEach();
        break;
      case TokenType.SIAO_LIAO_STOP:
      case TokenType.KNN_STOP:
        node = this.parseBreak();
        break;
      case TokenType.SKIP_LAH:
        node = this.parseContinue();
        break;
      case TokenType.STEADY_LAH_DO_THIS:
        node = this.parseFunctionDeclaration();
        break;
      case TokenType.HERE_TAKE:
        node = this.parseReturn();
        break;
      case TokenType.EH_DO_THIS:
        node = this.parseCallStatement();
        break;
      case TokenType.SEE_HOW_LAH:
        node = this.parseTryCatch();
        break;
      case TokenType.JIALAT_THROW:
      case TokenType.CCB_THROW:
      case TokenType.KNN_CRASH:
      case TokenType.PUKI_PANIC:
      case TokenType.CB_LAH:
      case TokenType.BABI_INPUT:
        node = this.parseThrow();
        break;
      case TokenType.PAISEH_WARN:
        node = this.parseWarn();
        break;
      case TokenType.HONG_GAN_LAH:
      case TokenType.CHAO_CB_ASSERT:
        node = this.parseAssert();
        break;
      case TokenType.EH_CHECK_THIS:
        node = this.parseCheck();
        break;
      case TokenType.CHIONG_BRING_IN:
        node = this.parseImport();
        break;
      case TokenType.SHARE_OUT:
        node = this.parseExport();
        break;
      default:
        throw new TokKokError(`Unexpected token: ${token.type}`, token.line);
    }

    if (intense) (node as any).isIntense = true;
    if (deprecated) (node as any).isDeprecated = true;
    return node;
  }

  // --- Statement Parsers ---
  private parseConstDeclaration(): ConstDeclarationNode {
    this.expect(TokenType.CONFIRM_GOT);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.EQUALS);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "ConstDeclaration", name, value };
  }

  private parseReassign(): ReassignNode {
    const opToken = this.next();
    const op =
      opToken.type === TokenType.EH_CHANGE
        ? "="
        : opToken.type === TokenType.ADD_SOME_MORE
          ? "+="
          : "-=";
    const target = this.parsePrimary();
    if (target.type !== "Identifier" && target.type !== "MemberExpr") {
      throw new TokKokError(
        `Invalid assignment target: ${target.type}`,
        opToken.line,
      );
    }
    this.expect(TokenType.EQUALS);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Reassign", target, value, op };
  }

  private parsePrintVerbose(): PrintVerboseNode {
    this.expect(TokenType.OI_LISTEN);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "PrintVerbose", value };
  }

  private parseIf(): IfNode {
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
    }
    let otherwise = null;
    if (this.match(TokenType.ABUDEN)) {
      this.next();
      this.expect(TokenType.LBRACE);
      otherwise = this.parseBlock();
    }
    return { type: "If", test, consequent, alternates, otherwise };
  }

  private parseWhile(): WhileNode {
    this.expect(TokenType.KEEP_GOING_LAH);
    this.expect(TokenType.LPAREN);
    const test = this.parseExpression();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const body = this.parseBlock();
    return { type: "While", test, body };
  }

  private parseFor(): ForNode {
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

  private parseForEach(): ForEachNode {
    this.expect(TokenType.EVERY_ONE_ALSO);
    this.expect(TokenType.LPAREN);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.IN);
    const arr = this.parseExpression();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const body = this.parseBlock();
    return { type: "ForEach", name, arr, body };
  }

  private parseBreak(): BreakNode {
    const token = this.next();
    this.consumeTerminator();
    return { type: "Break", variant: token.type };
  }

  private parseContinue(): ContinueNode {
    this.expect(TokenType.SKIP_LAH);
    this.consumeTerminator();
    return { type: "Continue" };
  }

  private parseFunctionDeclaration(): FunctionDeclarationNode {
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

  private parseReturn(): ReturnNode {
    this.expect(TokenType.HERE_TAKE);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Return", value };
  }

  private parseCallStatement(): CallStatementNode {
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

  private parseTryCatch(): TryCatchNode {
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

  private parseThrow(): ThrowNode {
    const token = this.next();
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Throw", variant: token.type, value };
  }

  private parseWarn(): WarnNode {
    this.expect(TokenType.PAISEH_WARN);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Warn", value };
  }

  private parseAssert(): AssertNode {
    const token = this.next();
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Assert", variant: token.type, value };
  }

  private parseCheck(): CheckNode {
    this.expect(TokenType.EH_CHECK_THIS);
    const value = this.parseExpression();
    this.consumeTerminator();
    return { type: "Check", value };
  }

  private parseInput(): InputNode {
    this.expect(TokenType.ASK_LAH);
    const prompt = this.parseExpression();
    return { type: "Input", prompt };
  }

  private parseImport(): ImportNode {
    this.expect(TokenType.CHIONG_BRING_IN);
    const module = this.expect(TokenType.STRING).value;
    this.consumeTerminator();
    return { type: "Import", module };
  }

  private parseExport(): ExportNode {
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
    let node: ASTNode;

    // Literals
    switch (token.type) {
      case TokenType.STRING:
        this.next();
        node = { type: "StringLiteral", value: token.value };
        break;
      case TokenType.NUMBER:
        this.next();
        node = { type: "NumberLiteral", value: Number(token.value) };
        break;
      case TokenType.CAN:
        this.next();
        node = { type: "BooleanLiteral", value: true };
        break;
      case TokenType.CANNOT:
        this.next();
        node = { type: "BooleanLiteral", value: false };
        break;
      case TokenType.BO_JIO:
        this.next();
        node = { type: "NullLiteral" };
        break;
      case TokenType.BLUR_BLUR:
        this.next();
        node = { type: "UndefinedLiteral" };
        break;
      case TokenType.JIALAT_ERROR:
      case TokenType.BO_JIO_ERROR:
      case TokenType.SIAO_ERROR:
      case TokenType.TOK_KOK_ERROR:
      case TokenType.TAN_KU_KU_ERROR:
      case TokenType.SUAY_ERROR:
      case TokenType.WAH_LAU_ERROR:
      case TokenType.GONE_CASE:
      case TokenType.CB_ERROR:
      case TokenType.LAN_JIAO_ERROR:
      case TokenType.CCB_ERROR:
        this.next();
        node = { type: "ErrorLiteral", variant: token.type };
        break;
      case TokenType.WORDS:
      case TokenType.NOMBOR:
      case TokenType.CAN_CANNOT:
      case TokenType.WHOLE_LIST:
      case TokenType.ALL_THE_THINGS:
        this.next();
        node = { type: "TypeLiteral", variant: token.type };
        break;
      case TokenType.ASK_LAH:
        node = this.parseInput();
        break;
      case TokenType.ONE_TIME_ONLY:
        node = this.parseAnonymousFunction();
        break;
      case TokenType.IDENTIFIER:
        const id = this.next().value;
        if (this.match(TokenType.LPAREN)) {
          this.next();
          const args = this.parseArgs();
          this.expect(TokenType.RPAREN);
          node = { type: "CallExpr", name: id, args };
        } else {
          node = { type: "Identifier", name: id };
        }
        break;
      case TokenType.LPAREN:
        this.next();
        const expr = this.parseExpression();
        this.expect(TokenType.RPAREN);
        node = expr;
        break;
      case TokenType.LBRACKET:
        this.next();
        const items = this.parseArrayItems();
        this.expect(TokenType.RBRACKET);
        node = { type: "ArrayLiteral", items };
        break;
      case TokenType.LBRACE:
        this.next();
        const obj = this.parseObjectItems();
        this.expect(TokenType.RBRACE);
        node = { type: "ObjectLiteral", obj };
        break;
      default:
        throw new TokKokError(
          `Unexpected primary token: ${token.type}`,
          token.line,
        );
    }

    // Member access (dot)
    while (this.match(TokenType.DOT)) {
      this.next();
      const property = this.expect(TokenType.IDENTIFIER).value;
      node = { type: "MemberExpr", object: node, property };
    }

    return node;
  }

  private parseSwitch(): SwitchNode {
    this.expect(TokenType.WHICH_ONE_LAH);
    this.expect(TokenType.LPAREN);
    const discriminant = this.parseExpression();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const cases: SwitchCaseNode[] = [];
    let defaultCase: ASTNode[] | null = null;
    while (!this.match(TokenType.RBRACE) && !this.match(TokenType.EOF)) {
      if (this.match(TokenType.IF_ITS)) {
        cases.push(this.parseSwitchCase());
      } else if (this.match(TokenType.LAST_RESORT)) {
        this.next();
        this.expect(TokenType.LBRACE);
        defaultCase = this.parseBlock();
      } else {
        throw new TokKokError(
          `Unexpected token in switch: ${this.peek().type}`,
          this.peek().line,
        );
      }
    }
    this.expect(TokenType.RBRACE);
    return { type: "Switch", discriminant, cases, defaultCase };
  }

  private parseSwitchCase(): SwitchCaseNode {
    this.expect(TokenType.IF_ITS);
    const test = this.parseExpression();
    this.expect(TokenType.LBRACE);
    const consequent = this.parseBlock();
    return { type: "SwitchCase", test, consequent };
  }

  private parseAnonymousFunction(): AnonymousFunctionNode {
    this.expect(TokenType.ONE_TIME_ONLY);
    this.expect(TokenType.LPAREN);
    const params = this.parseParams();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const body = this.parseBlock();
    return { type: "AnonymousFunction", params, body };
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
    while (
      this.pos < this.tokens.length &&
      (this.tokens[this.pos].type === TokenType.COMMENT ||
        this.tokens[this.pos].type === TokenType.MULTILINE_COMMENT)
    ) {
      this.pos++;
    }
    return this.tokens[this.pos];
  }

  private next(): Token {
    const token = this.peek();
    this.pos++;
    return token;
  }
}
