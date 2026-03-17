# VS Code Extension Setup 🎨

Coding in Lahlang is much better when your editor understands the "Singlish" syntax. We have a dedicated VS Code extension for this.

## Why you need this
Without the extension, your `.lah` files will look like plain text. The extension provides:
- Syntax highlighting for keywords like `eh listen lah`, `oi`, and `confirm or not`.
- Bracket matching.
- Comment toggling (`// shiok:` and `wahlau start ... wahlau end`).

---

## Installation Methods

### 1. From the Marketplace (Easiest)
Search for **"lahlang"** in the VS Code Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`) and click **Install**.

[Marketplace Link](https://marketplace.visualstudio.com/items?itemName=suryanshkushwaha.lahlang-vscode)

### 2. Manual Installation (For Developers)
If you've cloned the repository, you can install the extension manually:

1.  Open VS Code in the project root.
2.  Navigate to the `lahlang-extension` folder.
3.  Run `pnpm install`.
4.  Press `F5` to open a new "Extension Development Host" window with the extension loaded.

Alternatively, you can package it as a `.vsix` file:
```bash
cd lahlang-extension
npx vsce package
```
Then, in VS Code, go to the Extensions view, click the `...` (More Actions), and select **Install from VSIX...**.

---

## Confirming it Works

1.  Create a new file named `test.lah`.
2.  Type `eh listen lah`.
3.  If the text changes color (usually to blue or purple depending on your theme), the extension is working!

---

## Next Steps

Now that your editor is looking "steady", let's write some actual code.

👉 [Go to Getting Started](./03-Getting-Started.md)
