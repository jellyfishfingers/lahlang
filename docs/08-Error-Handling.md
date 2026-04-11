# Error Handling ⚠️

In Lahlang, we handle errors in two ways: the **Wholesome Tier** (polite) and the **Spicy Tier** 🌶️ (aggressive).

## Wholesome Tier (Try/Catch)

This is the standard way to handle potential issues.

```lah
see how lah {
  // Try something risky
  jialat throw "Something went wrong!";
} aiyoh kena (error) {
  // Catch the error
  oi "Kena error: " + error;
} confirm do {
  // Finally block
  oi "Clean up done.";
}
```

- `see how lah`: Try
- `aiyoh kena`: Catch
- `confirm do`: Finally
- `jialat throw`: Throw

---

## Spicy Tier 🌶️🌶️🌶️

For when things are truly "gone case", we use more aggressive keywords.

| Singlish Keyword  | Description           |
| :---------------- | :-------------------- |
| `kan ni na crash` | Unrecoverable crash.  |
| `puki panic`      | Nuclear panic button. |
| `chao cb assert`  | Aggressive assertion. |
| `hong gan lah`    | Fatal assertion.      |

### Example Assertion:

```lah
eh got age = 15;
chao cb assert (age more than 18);
```

---

## Error Types

Lahlang has custom error names to help you identify what went wrong:

- `JialatError`: Generic runtime error.
- `TokKokError`: Syntax error (Talking cock).
- `SiaoError`: Type error (Are you crazy?).
- `BoJioError`: Null reference (Nobody invited).
- `TanKuKuError`: Timeout (Wait long long).
- `SuayError`: Out-of-bounds style error.
- `WahLauError`: Stack overflow.
- `GoneCase`: Fatal crash.
- `CbError`: Mild runtime error.
- `LanJiaoError`: Garbage input/value style error.
- `CcbError`: Serious runtime error.

---

## Next Steps

Now that you can handle disasters, let's look at the power of the CLI.

👉 [CLI Reference](./09-CLI-Reference.md)
