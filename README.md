# Lahlang 🇸🇬

> A programming language for Singaporeans, by not a Singaporean yet. Can one lah!

## Table of Contents

- [Overview](#overview)
- [Documentation](#documentation)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Language Examples](#language-examples)
- [CLI Options](#cli-options)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Testing](#testing)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## Overview

Lahlang is a fun, expressive programming language inspired by Singlish and Singaporean culture. It’s designed for learning, experimentation, and joy, with syntax and keywords that reflect local slang and humor.

## Documentation

For a complete guide on how to use Lahlang, check out our extensive documentation:

1.  **[Installation Guide](./docs/01-Installation.md)**: Node.js/pnpm prerequisites and global CLI installation.
2.  **[VS Code Extension](./docs/02-VSCode-Extension.md)**: How to get syntax highlighting.
3.  **[Getting Started](./docs/03-Getting-Started.md)**: Your first `.lah` file and "Hello World".
4.  **[Variables and Types](./docs/04-Variables-and-Types.md)**: Data handling with Singlish types.
5.  **[Control Flow](./docs/05-Control-Flow.md)**: Logic with `confirm or not` and `which one lah`.
6.  **[Loops](./docs/06-Loops.md)**: Iteration with `keep going lah` and `every one also`.
7.  **[Functions](./docs/07-Functions.md)**: Defining and calling reusable blocks.
8.  **[Error Handling](./docs/08-Error-Handling.md)**: Wholesome and **Spicy 🌶️** tiers.
9.  **[CLI Reference](./docs/09-CLI-Reference.md)**: Commands, debugging, and meta keywords.
10. **[Examples Walkthrough](./docs/10-Examples-Walkthrough.md)**: Deep dive into the `examples/` folder.

## Features

- **Singlish Syntax:** Keywords like `eh listen lah`, `ok lah bye`, `oi`, `confirm or not`, `keep going lah`, etc.
- **VS Code Support:** Get syntax highlighting with the [Lahlang VS Code Extension](https://marketplace.visualstudio.com/items?itemName=suryanshkushwaha.lahlang-vscode).
- **Variables & Constants:** `eh got`, `confirm got`
- **Control Flow:** `confirm or not` (if), `or maybe` (else if), `abuden` (else), `keep going lah` (while), `one by one lah` (for), `every one also` (foreach)
- **Functions:** `steady lah do this`, `here take`, `eh do this`, `one time only`
- **Error Handling:** `see how lah`, `aiyoh kena`, `confirm do`, `jialat throw`, `paiseh warn`, `hong gan lah`, `chao cb assert`
- **Types:** `words` (string), `nombor` (number), `can cannot` (boolean), `whole list` (array), `all the things` (object)
- **Operators:** `same same` (==), `not same` (!=), `and also` (&&), `or can` (||), `add some more` (+=), `minus a bit` (-=)
- **Comments:** `// shiok:` (single-line), `wahlau start ... wahlau end` (multi-line)
- **Meta:** `chiong bring in` (import), `share out` (export), `eh check this` (debug/inspect)
- **Spicy Error Types:** `JialatError`, `BoJioError`, `SiaoError`, `TokKokError`, `TanKuKuError`, `SuayError`, `WahLauError`, `GoneCase`, `CbError`, `LanJiaoError`, `CcbError`

## Installation

Install globally using [pnpm](https://pnpm.io):

```bash
pnpm i -g lahlang
```

## Usage

Run a `.lah` file:

```bash
lahlang myfile.lah
```

## Language Examples

### Hello World

```lah
eh listen lah
	oi "Hello World";
ok lah bye
```

### FizzBuzz

```lah
eh listen lah
	one by one lah (i from 1 to 15) {
		confirm or not (i % 15 same same 0) {
			oi "FizzBuzz";
		} or maybe (i % 3 same same 0) {
			oi "Fizz";
		} or maybe (i % 5 same same 0) {
			oi "Buzz";
		} abuden {
			oi i;
		}
	}
ok lah bye
```

### Data Structures

```lah
eh listen lah
	eh got my_list = [1, 2, "shiok", can];
	oi my_list;
	every one also (item in my_list) {
		oi item;
	}
	eh got my_bag = {
		food: "Chicken Rice",
		price: 4.5,
		tasty: can
	};
	oi my_bag;
ok lah bye
```

### Advanced Logic

```lah
eh listen lah
	steady lah do this makeCounter(start) {
		eh got count = start;
		steady lah do this increment() {
			eh change count = count + 1;
			here take count;
		}
		here take increment;
	}
	eh got my_counter = makeCounter(10);
	oi my_counter();
ok lah bye
```

## CLI Options

- `lahlang <file.lah>`: Run a Lahlang program.
- Only `.lah` files are accepted.
- Errors are reported in Singlish style, e.g. `[TOK KOK]`, `[RUNTIME ERROR]`, `[FATAL]`, `[ALAMAK]`.

## Project Structure

```
lahlang/
├── src/                # Source code (lexer, parser, interpreter, CLI)
├── examples/           # Example .lah programs
├── tests/              # Unit and integration tests
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript config
├── vitest.config.ts    # Test config
```

## Architecture

- **Lexer:** Tokenizes source code using Singlish keywords.
- **Parser:** Builds AST from tokens, supports all language features.
- **Interpreter:** Executes AST, manages environment, handles errors.
- **CLI:** Entry point for running `.lah` files, handles file I/O and error reporting.

## Testing

Run all tests with:

```bash
pnpm test
```

- Uses [Vitest](https://vitest.dev/) for unit and integration tests.
- Test coverage includes lexer, parser, interpreter, error handling, and full language features.

## Contributing

Contributions are welcome! Please open issues or pull requests for:

- Bug fixes
- Feature requests
- Documentation improvements
- New examples

## Support

If Lahlang helps you or made you smile, you can support the project here:

- GitHub Sponsors: https://github.com/sponsors/suryanshkushwaha
- Buy Me a Coffee: https://buymeacoffee.com/suryanshkushwaha

## License

MIT License

---

**For more examples, see the `examples/` folder. For full language reference, see `src/tokens.ts`.**

---
