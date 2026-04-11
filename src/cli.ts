#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgGreen: "\x1b[42m",
  bgBlue: "\x1b[44m",
  bgRed: "\x1b[41m",
};

function printBanner() {
  const banner = `
${colors.cyan}${colors.bright}
    ██╗      █████╗ ██╗  ██╗██╗      █████╗ ███╗   ██╗ ██████╗ 
    ██║     ██╔══██╗██║  ██║██║     ██╔══██╗████╗  ██║██╔════╝ 
    ██║     ███████║███████║██║     ███████║██╔██╗ ██║██║  ███╗
    ██║     ██╔══██║██╔══██║██║     ██╔══██║██║╚██╗██║██║   ██║
    ███████╗██║  ██║██║  ██║███████╗██║  ██║██║ ╚████║╚██████╔╝
    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
${colors.reset}
${colors.green}${colors.bright}    v0.2.0 — Can one lah! 🇸🇬${colors.reset}

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
  process.exit(0);
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
