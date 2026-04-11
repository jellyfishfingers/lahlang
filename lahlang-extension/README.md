# Lahlang VS Code Extension

## Overview

Lahlang Extension provides syntax highlighting and basic language support for the Lahlang programming language in Visual Studio Code. It is designed to help developers write, read, and maintain Lahlang code efficiently.

## Features

- Syntax highlighting for Lahlang files (`.lah`)
- Language configuration for comments, brackets, and auto-closing pairs
- Easy integration with VS Code

## Installation

Install the **lahlang** extension directly from the VS Code Marketplace:

1. Open **Visual Studio Code**.
2. Open the **Extensions** view (`Ctrl+Shift+X`).
3. Search for `lahlang`.
4. Click **Install**.

Alternatively, you can install it via the command line:
```bash
code --install-extension suryanshkushwaha.lahlang-vscode
```

## Development

To set up the extension for local development:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/suryanshkushwaha/lahlang.git
   ```
2. **Navigate to the extension folder:**
   ```bash
   cd lahlang/lahlang-extension
   ```
3. **Install dependencies:**
   ```bash
   pnpm install
   ```
4. **Launch VS Code and open the extension folder.**
5. **Press `F5` to start a new Extension Development Host.**

## Usage

- Open any `.lah` file in VS Code to activate syntax highlighting and language features.
- For advanced features, ensure the extension is enabled in your VS Code environment.

## Project Structure

- `language-configuration.json`: Defines comment styles, brackets, and auto-closing pairs.
- `syntaxes/lahlang.tmLanguage.json`: TextMate grammar for Lahlang syntax highlighting.
- `package.json`: Extension manifest and configuration.
- `pnpm-lock.yaml`: Dependency lock file.

## Contributing

1. Fork the repository and create your branch.
2. Make your changes and add tests if necessary.
3. Submit a pull request with a clear description of your changes.

## Publishing

1. Ensure all changes are committed and the extension is production-ready.
2. Run:
   ```bash
   pnpm run package
   ```
3. Publish to the VS Code Marketplace using `vsce`:
   ```bash
   pnpm exec vsce publish
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

## Support

For issues, feature requests, or questions, please open an issue in the [repository](https://github.com/suryanshkushwaha/lahlang/issues) or contact the maintainers.

If you want to support development:

- GitHub Sponsors: https://github.com/sponsors/suryanshkushwaha
- Buy Me a Coffee: https://buymeacoffee.com/suryanshkushwaha
