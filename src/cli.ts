#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

// ANSI color codes
const useColors = Boolean(process.stdout.isTTY);
const colors = {
  reset: useColors ? "\x1b[0m" : "",
  bright: useColors ? "\x1b[1m" : "",
  dim: useColors ? "\x1b[2m" : "",
  red: useColors ? "\x1b[31m" : "",
  green: useColors ? "\x1b[32m" : "",
  yellow: useColors ? "\x1b[33m" : "",
  blue: useColors ? "\x1b[34m" : "",
  magenta: useColors ? "\x1b[35m" : "",
  cyan: useColors ? "\x1b[36m" : "",
  white: useColors ? "\x1b[37m" : "",
  bgGreen: useColors ? "\x1b[42m" : "",
  bgBlue: useColors ? "\x1b[44m" : "",
  bgRed: useColors ? "\x1b[41m" : "",
};

function getCliVersion(): string {
  try {
    const packageJsonPath = path.resolve(__dirname, "..", "package.json");
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, "utf-8"),
    ) as {
      version?: string;
    };
    return packageJson.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}

function printBanner() {
  const version = getCliVersion();
  const banner = `
${colors.cyan}${colors.bright}
    ██╗      █████╗ ██╗  ██╗██╗      █████╗ ███╗   ██╗ ██████╗ 
    ██║     ██╔══██╗██║  ██║██║     ██╔══██╗████╗  ██║██╔════╝ 
    ██║     ███████║███████║██║     ███████║██╔██╗ ██║██║  ███╗
    ██║     ██╔══██║██╔══██║██║     ██╔══██║██║╚██╗██║██║   ██║
    ███████╗██║  ██║██║  ██║███████╗██║  ██║██║ ╚████║╚██████╔╝
    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
${colors.reset}
${colors.green}${colors.bright}    v${version} — Can one lah! 🇸🇬${colors.reset}

${colors.yellow}Usage:${colors.reset}
  ${colors.cyan}lahlang${colors.reset} ${colors.white}<file.lah>${colors.reset}

${colors.yellow}Examples:${colors.reset}
  ${colors.dim}lahlang hello.lah${colors.reset}
  ${colors.dim}lahlang fizzbuzz.lah${colors.reset}
`;

  console.log(banner);
}

const args = process.argv.slice(2);

if (args.length === 0) {
  printBanner();
  startREPL();
} else {
  // Existing file-run logic should remain in this branch so it only runs
  // when a filename argument is provided.
}

function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${colors.cyan}lah>${colors.reset} `,
  });

  const interpreter = new Interpreter();
  let buffer = "";
  let braceDepth = 0;

  console.log(
    `${colors.dim}Type Singlish code (no need eh listen lah / ok lah bye).${colors.reset}`,
  );
  console.log(
    `${colors.dim}Press Ctrl+C to exit.${colors.reset}\n`,
  );

  rl.prompt();

  rl.on("line", (line: string) => {
    buffer += (buffer ? "\n" : "") + line;

    for (const ch of line) {
      if (ch === "{") braceDepth++;
      if (ch === "}") braceDepth--;
    }

    if (braceDepth > 0) {
      process.stdout.write(`${colors.dim}...${colors.reset} `);
      return;
    }

    braceDepth = 0;

    if (buffer.trim() === "") {
      buffer = "";
      rl.prompt();
      return;
    }

    try {
      const lexer = new Lexer(buffer);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
      const stmts = parser.parseREPL();
      interpreter.runStatements(stmts);
    } catch (err: any) {
      if (err.name === "TokKokError") {
        console.error(`${colors.red}[TOK KOK] ${err.message}${colors.reset}`);
      } else if (err.name === "GoneCase") {
        console.error(`${colors.red}[FATAL] ${err.message}${colors.reset}`);
      } else {
        console.error(
          `${colors.red}[ERROR] ${err.name || "Error"}: ${err.message || err}${colors.reset}`,
        );
      }
    }

    buffer = "";
    rl.prompt();
  });

  rl.on("close", () => {
    console.log(`\n${colors.green}Ok lah bye! 👋${colors.reset}`);
    process.exit(0);
  });

  return;
}

const filePath = path.resolve(args[0]);

if (!filePath.endsWith(".lah")) {
  console.error("Eh, only .lah files can one lah!");
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`Alamak! Cannot find file: ${filePath}`);
  process.exit(1);
}

try {
  const source = fs.readFileSync(filePath, "utf-8");

  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();

  const parser = new Parser(tokens);
  const ast = parser.parse();

  const interpreter = new Interpreter();
  interpreter.run(ast);
} catch (err: any) {
  if (err.name === "TokKokError") {
    console.error(`[TOK KOK] ${err.message}`);
  } else if (
    err.name === "JialatError" ||
    err.name === "BoJioError" ||
    err.name === "SiaoError" ||
    err.name === "CcbError" ||
    err.name === "CbError" ||
    err.name === "LanJiaoError"
  ) {
    console.error(`[RUNTIME ERROR] ${err.name}: ${err.message}`);
  } else if (err.name === "GoneCase") {
    // Already handled in interpreter.run for fatal ones, but if it bubbles up:
    console.error(`[FATAL] ${err.name}: ${err.message}`);
  } else {
    console.error(
      `[ALAMAK] Something went wrong sia: ${err.name || "Error"}: ${err.message || err}`,
    );
  }
  process.exit(1);
}
