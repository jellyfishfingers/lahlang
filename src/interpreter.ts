import * as fs from "fs";
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
  CheckNode,
  InputNode,
  MemberExprNode,
} from "./parser";
import {
  JialatError,
  BoJioError,
  SiaoError,
  TokKokError,
  TanKuKuError,
  SuayError,
  WahLauError,
  GoneCase,
  CbError,
  LanJiaoError,
  CcbError,
  ChaoCbError,
} from "./errors";

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
      } else if (err instanceof ReturnSignal || err instanceof BreakSignal || err instanceof ContinueSignal) {
        // These shouldn't bubble up to the top level
        console.error("[ERROR] Unexpected signal at top level lah!");
        process.exit(1);
      } else {
        // Re-throw other errors so they can be handled by index.ts
        throw err;
      }
    }
  }

  private evaluate(node: ASTNode): unknown {
    if ((node as any).isDeprecated) {
      console.warn("[OLD LIAO] This part of the code is deprecated already lah!");
    }
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
        const val = this.evaluate(n.value);
        if (n.target.type === "Identifier") {
          const name = n.target.name;
          if (n.op === "=") {
            this.env.assign(name, val);
          } else if (n.op === "+=") {
            const current = this.env.get(name);
            this.env.assign(name, (current as any) + (val as any));
          } else if (n.op === "-=") {
            const current = this.env.get(name);
            this.env.assign(name, (current as any) - (val as any));
          }
        } else if (n.target.type === "MemberExpr") {
          const obj = this.evaluate(n.target.object);
          if (obj === null || obj === undefined) {
            throw new BoJioError(`Cannot assign to property '${n.target.property}' of ${obj}`);
          }
          if (n.op === "=") {
            (obj as any)[n.target.property] = val;
          } else if (n.op === "+=") {
            (obj as any)[n.target.property] += (val as any);
          } else if (n.op === "-=") {
            (obj as any)[n.target.property] -= (val as any);
          }
        }
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
      case "ErrorLiteral": {
        switch (node.variant) {
          case TokenType.JIALAT_ERROR: return JialatError;
          case TokenType.BO_JIO_ERROR: return BoJioError;
          case TokenType.SIAO_ERROR: return SiaoError;
          case TokenType.TOK_KOK_ERROR: return TokKokError;
          case TokenType.TAN_KU_KU_ERROR: return TanKuKuError;
          case TokenType.SUAY_ERROR: return SuayError;
          case TokenType.WAH_LAU_ERROR: return WahLauError;
          case TokenType.GONE_CASE: return GoneCase;
          case TokenType.CB_ERROR: return CbError;
          case TokenType.LAN_JIAO_ERROR: return LanJiaoError;
          case TokenType.CCB_ERROR: return CcbError;
          case TokenType.CHAO_CB_ERROR: return ChaoCbError;
          default: return Error;
        }
      }
      case "TypeLiteral": {
        switch (node.variant) {
          case TokenType.WORDS: return "WORDS";
          case TokenType.NOMBOR: return "NOMBOR";
          case TokenType.CAN_CANNOT: return "CAN_CANNOT";
          case TokenType.WHOLE_LIST: return "WHOLE_LIST";
          case TokenType.ALL_THE_THINGS: return "ALL_THE_THINGS";
          default: return "UNKNOWN_TYPE";
        }
      }
      case "Identifier": {
        return this.env.get(node.name);
      }
      case "BinaryExpr": {
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);
        switch (node.op) {
          case "+":
            const toString = (v: any) => (v instanceof Error ? v.message : String(v));
            return typeof left === "string" || typeof right === "string" || left instanceof Error || right instanceof Error
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
      case "AnonymousFunction": {
        const closureEnv = this.env;
        return (...args: any[]) => {
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
      }
      case "CallExpr": {
        const n = node as CallExprNode;
        const fn = this.env.get(n.name);
        if (typeof fn !== "function")
          throw new SiaoError(`'${n.name}' is not a function`);
        return (fn as any)(
          ...n.args.map((arg: any) => this.evaluate(arg)),
        );
      }
      case "Switch": {
        const val = this.evaluate(node.discriminant);
        let matched = false;
        for (const caseNode of node.cases) {
          if (this.evaluate(caseNode.test) === val) {
            this.evalBlock(caseNode.consequent, true);
            matched = true;
            break;
          }
        }
        if (!matched && node.defaultCase) {
          this.evalBlock(node.defaultCase, true);
        }
        return;
      }
      case "If": {
        if (this.evaluate(node.test)) {
          this.evalBlock(node.consequent, true);
        } else {
          let taken = false;
          if (node.alternates && node.alternates.length) {
            for (const alt of node.alternates) {
              if (this.evaluate(alt.test)) {
                this.evalBlock(alt.body, true);
                taken = true;
                break;
              }
            }
          }
          if (!taken && node.otherwise) {
            this.evalBlock(node.otherwise, true);
          }
        }
        return;
      }
      case "While": {
        while (this.evaluate(node.test)) {
          try {
            this.evalBlock(node.body, true);
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
            this.evalBlock(n.body); // evalBlock with new env already set
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
        const arr = this.evaluate(node.arr);
        if (!Array.isArray(arr))
          throw new SiaoError(`Expected array for iteration`);
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
          this.evalBlock(node.tryBlock, true);
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
          if (node.finallyBlock) this.evalBlock(node.finallyBlock, true);
        }
        return;
      }
      case "Throw": {
        const n = node as ThrowNode;
        const msg = String(this.evaluate(n.value));
        if (n.variant === TokenType.JIALAT_THROW) throw new JialatError(msg);
        if (n.variant === TokenType.CCB_THROW) throw new CcbError(msg);
        if (n.variant === TokenType.CB_LAH) throw new CbError(msg);
        if (n.variant === TokenType.BABI_INPUT) throw new LanJiaoError(msg);
        if (n.variant === TokenType.KNN_CRASH || n.variant === TokenType.PUKI_PANIC) throw new GoneCase(msg);
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
          if (node.variant === TokenType.CHAO_CB_ASSERT || node.variant === TokenType.HONG_GAN_LAH) {
             throw new GoneCase(`SI BEH JIALAT! ${msg}`);
          }
          throw new GoneCase(msg);
        }
        return;
      }
      case "Check": {
        const val = this.evaluate(node.value);
        console.log("[EH CHECK THIS]", val);
        return;
      }
      case "Input": {
        const prompt = this.evaluate(node.prompt);
        process.stdout.write(`[ASK LAH] ${prompt}: `);
        const buffer = Buffer.alloc(1024);
        const bytesRead = fs.readSync(0, buffer, 0, 1024, null);
        return buffer.toString("utf8", 0, bytesRead).trim();
      }
      case "MemberExpr": {
        const obj = this.evaluate(node.object);
        if (obj === null || obj === undefined) {
          throw new BoJioError(`Cannot access property '${node.property}' of ${obj}`);
        }
        return (obj as any)[node.property];
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

  private evalBlock(body: ASTNode[], newScope: boolean = false): void {
    const prevEnv = this.env;
    if (newScope) {
      this.env = new Environment(prevEnv);
    }
    try {
      for (const stmt of body) {
        this.evaluate(stmt);
      }
    } finally {
      if (newScope) {
        this.env = prevEnv;
      }
    }
  }
}
