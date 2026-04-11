# Installation Guide 🇸🇬

Welcome to **Lahlang**! Before you can start coding like a true Singaporean, you need to set up your environment.

## Prerequisites

Lahlang is built on Node.js. You'll need to have it installed on your machine.

1.  **Node.js**: Version 16.0.0 or higher.
    - [Download Node.js](https://nodejs.org/)
2.  **pnpm (Recommended)**: We use `pnpm` for package management, but `npm` or `yarn` work too.
    - Install pnpm: `npm install -g pnpm`

---

## Installing the Lahlang CLI

To run `.lah` files from your terminal, you need to install the `lahlang` package globally.

### Using pnpm (Shiok!)
```bash
pnpm add -g lahlang
```

### Using npm
```bash
npm install -g lahlang
```

### Using yarn
```bash
yarn global add lahlang
```

---

## Verifying the Installation

Once installed, you can check if it's working by running:

```bash
lahlang
```

If you see the Lahlang banner and usage help, you're ready to go.

---

## Next Steps

Now that you have the CLI installed, you'll definitely want **Syntax Highlighting** so your code doesn't look like a mess. 

👉 [Proceed to VS Code Extension Setup](./02-VSCode-Extension.md)
