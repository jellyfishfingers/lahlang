#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Lahlang v0.1.0 — Can one lah! 🇸🇬");
  console.log("Usage: lahlang <file.lah>");
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
  } else if (err.name === "JialatError" || err.name === "BoJioError" || err.name === "SiaoError") {
    console.error(`[JIALAT] ${err.message}`);
  } else {
    console.error(`[ALAMAK] Something went wrong sia: ${err.message || err}`);
  }
  process.exit(1);
}
