# CLI Reference 💻

The `lahlang` command-line interface is your main tool for running and debugging Lahlang code.

## Running Files

The most basic command runs a `.lah` file:

```bash
lahlang my_file.lah
```

## REPL Mode

Run Lahlang without arguments to start interactive REPL mode:

```bash
lahlang
```

Inside REPL, type code directly (no `eh listen lah` / `ok lah bye` wrappers needed).

To exit REPL:

- Type `bye lah` on its own line (dedicated quit keyword), or
- Press `Ctrl+C`

---

## Debugging Features

Lahlang provides built-in ways to inspect your code while it's running.

### 1. `oi listen`

Use `oi listen` instead of `oi` for more verbose or debug-style output.

```lah
eh got secret = "confidential";
oi listen secret;
```

### 2. `eh check this`

This keyword is used for deep inspection of variables or objects.

```lah
eh got my_bag = { items: 5 };
eh check this my_bag;
```

---

## Project Meta Keywords

You can also manage imports and exports within your files.

- `chiong bring in`: Import a module or file.
- `share out`: Export a value or function.
- `old liao`: Mark a piece of code as deprecated.

### Example:

```lah
chiong bring in "math_utils.lah";

eh got my_const = 100;
share out my_const;

old liao steady lah do this legacyFunc() { ... }
```

---

## Next Steps

You are now a Lahlang expert! Let's look at some real-world examples to see it all in action.

👉 [Walkthrough Examples](./10-Examples-Walkthrough.md)
