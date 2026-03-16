import { Token } from "./tokens";

// AST node types
export type ASTNode =
  | ProgramNode
  | VarDeclarationNode
  | PrintNode
  | StringLiteralNode
  | NumberLiteralNode
  | BooleanLiteralNode
  | NullLiteralNode
  | IdentifierNode
  | BinaryExprNode;

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
    // TODO: implement parsing
    // Consume tokens and build AST
    return { type: "Program", body: [] };
  }
}
