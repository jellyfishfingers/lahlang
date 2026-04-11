# Control Flow 🚦

Decision making in Lahlang is straightforward and expressive. We use `confirm or not` for logic.

## If / Else Statements

The basic syntax for an "if" statement is `confirm or not`.

```lah
eh got budget = 5;

confirm or not (budget more than 10) {
  oi "Can eat expensive food!";
} or maybe (budget same same 5) {
  oi "Cai Fan it is.";
} abuden {
  oi "Just drink water lah.";
}
```

### Keywords:
- `confirm or not`: If
- `or maybe`: Else If
- `abuden`: Else

---

## Comparison Operators

To compare values, use these Singlish operators:

| Singlish Operator | Traditional | Description |
| :--- | :--- | :--- |
| `same same` | `==` | Equal to |
| `not same` | `!=` | Not equal to |
| `more than` | `>` | Greater than |
| `less than` | `<` | Less than |
| `more than or same` | `>=` | Greater than or equal to |
| `less than or same` | `<=` | Less than or equal to |

---

## Logical Operators

Combine multiple conditions:

| Singlish Operator | Traditional | Description |
| :--- | :--- | :--- |
| `and also` | `&&` | Logical AND |
| `or can` | `||` | Logical OR |
| `dun want` | `!` | Logical NOT |

### Example:
```lah
confirm or not (is_raining and also dun want umbrella) {
  oi "You will get wet lah!";
}
```

---

## The Switch Statement: `which one lah`

When you have many options, use `which one lah`.

```lah
eh got choice = "Kopi";

which one lah (choice) {
  if it's "Kopi" {
    oi "Strong choice!";
  }
  if it's "Teh" {
    oi "Relaxing sia.";
  }
  last resort {
    oi "Drink water good for health.";
  }
}
```

- `which one lah`: Switch
- `if it's`: Case
- `last resort`: Default

---

## Next Steps

Logic is done! Time to repeat things until we're tired.

👉 [Learn about Loops](./06-Loops.md)
