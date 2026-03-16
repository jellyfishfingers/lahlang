import { TokenType } from "./tokens";
import type {
  ProgramNode,
  VarDeclarationNode,
  ConstDeclarationNode,
  ReassignNode,
  PrintNode,
  PrintVerboseNode,
  IfNode,
  ElseIfNode,
  WhileNode,
  ForNode,
  ForEachNode,
  BreakNode,
  ContinueNode,
  FunctionDeclarationNode,
  ReturnNode,
  CallStatementNode,
  TryCatchNode,
  ThrowNode,
  WarnNode,
  AssertNode,
  ImportNode,
  ExportNode,
  StringLiteralNode,
  NumberLiteralNode,
  BooleanLiteralNode,
  NullLiteralNode,
  UndefinedLiteralNode,
  IdentifierNode,
  BinaryExprNode,
  UnaryExprNode,
  ArrayLiteralNode,
  ObjectLiteralNode,
  CallExprNode,
  ASTNode,
} from "./parser";

// --- Built-in Error Classes ---
export class JialatError extends Error {}
export class BoJioError extends Error {}
export class SiaoError extends Error {}
export class TokKokError extends Error {}
export class TanKuKuError extends Error {}
export class SuayError extends Error {}
export class WahLauError extends Error {}
export class GoneCase extends Error {}
export class CbError extends Error {}
export class LanJiaoError extends Error {}
export class CcbError extends Error {}
export class ChaoCbError extends Error {}

// --- Internal Signals ---
class ReturnSignal {
  constructor(public value: unknown) {}
}
class BreakSignal {}
class ContinueSignal {}

class Environment {
  private values: Map<string, any> = new Map();
  constructor(public parent: Environment | null = null) {}

  set(name: string, value: any): void {
    this.values.set(name, value);
  }

  assign(name: string, value: any): void {
    if (this.values.has(name)) {
      this.values.set(name, value);
    } else if (this.parent) {
      this.parent.assign(name, value);
    } else {
      throw new JialatError(`Cannot reassign '${name}', not found`);
    }
  }

  get(name: string): any {
    if (this.values.has(name)) {
      return this.values.get(name);
    } else if (this.parent) {
      return this.parent.get(name);
    } else {
      throw new BoJioError(`Bo jio: '${name}' not found`);
    }
  }

  has(name: string): boolean {
    if (this.values.has(name)) return true;
    if (this.parent) return this.parent.has(name);
    return false;
  }
}

export class Interpreter {
  private globalEnv: Environment = new Environment();
  private env: Environment = this.globalEnv;

  run(program: ProgramNode): void {
    try {
      for (const node of program.body) {
        this.evaluate(node);
      }
    } catch (err) {
      if (err instanceof GoneCase || err instanceof ChaoCbError) {
        console.error(`GONE CASE LAH! Program die already: ${err instanceof Error ? err.message : err}`);
        process.exit(1);
      } else if (err instanceof Error) {
        console.error(`[ERROR] ${err.name}: ${err.message}`);
      } else {
        console.error(`[ERROR] ${err}`);
      }
    }
  }

  private evaluate(node: ASTNode): unknown {
    switch (node.type) {
      case "VarDeclaration": {
        this.env.set(node.name, this.evaluate(node.value));
        return;
      }
      case "ConstDeclaration": {
        const n = node as ConstDeclarationNode;
        this.env.set(n.name, this.evaluate(n.value));
        return;
      }
      case "Reassign": {
        const n = node as ReassignNode;
        this.env.assign(n.name, this.evaluate(n.value));
        return;
      }
      case "Print": {
        const val = this.evaluate(node.value);
        console.log(val);
        return;
      }
      case "PrintVerbose": {
        const n = node as PrintVerboseNode;
        const val = this.evaluate(n.value);
        console.log("[DEBUG]", val);
        return;
      }
      case "StringLiteral":
        return node.value;
      case "NumberLiteral":
        return node.value;
      case "BooleanLiteral":
        return node.value;
      case "NullLiteral":
        return null;
      case "UndefinedLiteral":
        return undefined;
      case "Identifier": {
        return this.env.get(node.name);
      }
      case "BinaryExpr": {
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);
        switch (node.op) {
          case "+":
            const toString = (v: any) => (v instanceof Error ? v.message : String(v));
            return typeof left === "string" || typeof right === "string"
              ? toString(left) + toString(right)
              : (left as any) + (right as any);
          case "-":
            return (left as any) - (right as any);
          case "*":
            return (left as any) * (right as any);
          case "/":
            return (left as any) / (right as any);
          case "%":
            return (left as any) % (right as any);
          case "same same":
            return left === right;
          case "not same":
            return left !== right;
          case "and also":
            return Boolean(left) && Boolean(right);
          case "or can":
            return Boolean(left) || Boolean(right);
          case "more than":
            return (left as any) > (right as any);
          case "less than":
            return (left as any) < (right as any);
          case "more than or same":
            return (left as any) >= (right as any);
          case "less than or same":
            return (left as any) <= (right as any);
          default:
            throw new SiaoError(`Unknown binary op: ${node.op}`);
        }
      }
      case "UnaryExpr": {
        const val = this.evaluate(node.expr);
        switch (node.op) {
          case "dun want":
            return !val;
          case "-":
            return -(val as any);
          default:
            throw new SiaoError(`Unknown unary op: ${node.op}`);
        }
      }
      case "ArrayLiteral": {
        const n = node as ArrayLiteralNode;
        return n.items.map((item: any) => this.evaluate(item));
      }
      case "ObjectLiteral": {
        const obj: any = {};
        for (const key in node.obj) {
          obj[key] = this.evaluate(node.obj[key]);
        }
        return obj;
      }
      case "CallExpr": {
        const n = node as CallExprNode;
        const fn = this.env.get(n.name);
        if (typeof fn !== "function")
          throw new SiaoError(`'${n.name}' is not a function`);
        return (fn as Function)(
          ...n.args.map((arg: any) => this.evaluate(arg)),
        );
      }
      case "If": {
        if (this.evaluate(node.test)) {
          this.evalBlock(node.consequent);
        } else {
          let taken = false;
          if (node.alternates && node.alternates.length) {
            for (const alt of node.alternates) {
              if (this.evaluate(alt.test)) {
                this.evalBlock(alt.body);
                taken = true;
                break;
              }
            }
          }
          if (!taken && node.otherwise) {
            this.evalBlock(node.otherwise);
          }
        }
        return;
      }
      case "While": {
        while (this.evaluate(node.test)) {
          try {
            this.evalBlock(node.body);
          } catch (sig) {
            if (sig instanceof BreakSignal) break;
            if (sig instanceof ContinueSignal) continue;
            throw sig;
          }
        }
        return;
      }
      case "For": {
        const n = node as ForNode;
        let start = Number(this.evaluate(n.start));
        let end = Number(this.evaluate(n.end));
        const prevEnv = this.env;
        for (let i = start; i <= end; i++) {
          this.env = new Environment(prevEnv);
          this.env.set(n.name, i);
          try {
            this.evalBlock(n.body);
          } catch (sig) {
            if (sig instanceof BreakSignal) break;
            if (sig instanceof ContinueSignal) continue;
            throw sig;
          } finally {
            this.env = prevEnv;
          }
        }
        return;
      }
      case "ForEach": {
        const arr = this.env.get(node.arr);
        if (!Array.isArray(arr))
          throw new SiaoError(`'${node.arr}' is not an array`);
        const prevEnv = this.env;
        for (const val of arr) {
          this.env = new Environment(prevEnv);
          this.env.set(node.name, val);
          try {
            this.evalBlock(node.body);
          } catch (sig) {
            if (sig instanceof BreakSignal) break;
            if (sig instanceof ContinueSignal) continue;
            throw sig;
          } finally {
            this.env = prevEnv;
          }
        }
        return;
      }
      case "Break": {
        throw new BreakSignal();
      }
      case "Continue": {
        throw new ContinueSignal();
      }
      case "FunctionDeclaration": {
        const closureEnv = this.env;
        const fn = (...args: any[]) => {
          const callEnv = new Environment(closureEnv);
          for (let i = 0; i < node.params.length; i++) {
            callEnv.set(node.params[i], args[i]);
          }
          const prevEnv = this.env;
          this.env = callEnv;
          try {
            this.evalBlock(node.body);
          } catch (sig) {
            if (sig instanceof ReturnSignal) return sig.value;
            throw sig;
          } finally {
            this.env = prevEnv;
          }
        };
        this.env.set(node.name, fn);
        return;
      }
      case "Return": {
        throw new ReturnSignal(this.evaluate(node.value));
      }
      case "CallStatement": {
        const n = node as CallStatementNode;
        const fn = this.env.get(n.name);
        if (typeof fn !== "function")
          throw new SiaoError(`'${n.name}' is not a function`);
        (fn as Function)(...n.args.map((arg: any) => this.evaluate(arg)));
        return;
      }
      case "TryCatch": {
        try {
          this.evalBlock(node.tryBlock);
        } catch (err) {
          const prevEnv = this.env;
          this.env = new Environment(prevEnv);
          this.env.set(node.errName, err);
          try {
            this.evalBlock(node.catchBlock);
          } finally {
            this.env = prevEnv;
          }
        } finally {
          if (node.finallyBlock) this.evalBlock(node.finallyBlock);
        }
        return;
      }
      case "Throw": {
        const n = node as ThrowNode;
        const msg = String(this.evaluate(n.value));
        if (n.variant === TokenType.JIALAT_THROW) throw new JialatError(msg);
        if (n.variant === TokenType.CCB_THROW) throw new CcbError(msg);
        throw new Error(msg);
      }
      case "Warn": {
        console.warn("[PAISEH]", this.evaluate(node.value));
        return;
      }
      case "Assert": {
        const val = this.evaluate(node.value);
        if (!val) {
          const msg = `Assert failed: ${JSON.stringify(val)}`;
          throw new GoneCase(msg);
        }
        return;
      }
      case "Import": {
        const n = node as ImportNode;
        const mod = require(String(n.module));
        this.env.set(n.module, mod);
        return;
      }
      case "Export": {
        // No-op for now
        return;
      }
      default:
        throw new TokKokError(`Unknown AST node type: ${(node as any).type}`);
    }
  }

  private evalBlock(body: ASTNode[]): void {
    for (const stmt of body) {
      this.evaluate(stmt);
    }
  }
}
