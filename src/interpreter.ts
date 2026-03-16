import { ASTNode, ProgramNode } from "./parser";

export class Interpreter {
  private env: Map<string, unknown> = new Map();

  run(program: ProgramNode): void {
    // TODO: implement execution
    // Walk AST nodes and evaluate each one
    for (const node of program.body) {
      this.evaluate(node);
    }
  }

  private evaluate(node: ASTNode): unknown {
    // TODO: handle each node type
    return null;
  }
}
