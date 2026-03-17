# Loops 🔄

Repeating tasks in Lahlang is easy. We have several types of loops to handle different scenarios.

## While Loop: `keep going lah`

Use this when you want to repeat something while a condition is true.

```lah
eh got counter = 0;

keep going lah (counter less than 5) {
  oi counter;
  eh change counter = counter + 1;
}
```

---

## For Loop: `one by one lah`

Use this to iterate through a range of numbers.

```lah
one by one lah (i from 1 to 5) {
  oi i;
}
```

---

## Foreach Loop: `every one also`

Use this to iterate through lists (arrays) or objects.

### For Lists:
```lah
eh got fruits = ["Apple", "Durian", "Mango"];

every one also (fruit in fruits) {
  oi fruit;
}
```

---

## Loop Control

Sometimes you need to stop early or skip an iteration.

| Singlish Keyword | Traditional | Description |
| :--- | :--- | :--- |
| `siao liao stop` | `break` | Exit the loop immediately. |
| `knn stop` | `break` | Aggressive break (same as above). |
| `skip lah` | `continue` | Skip to the next iteration. |

### Example:
```lah
one by one lah (i from 1 to 10) {
  confirm or not (i same same 5) {
    skip lah; // Don't print 5
  }
  confirm or not (i same same 8) {
    siao liao stop; // Stop completely at 8
  }
  oi i;
}
```

---

## Next Steps

Loops are "steady"! Now let's learn how to organize our code into reusable blocks.

👉 [Discover Functions](./07-Functions.md)
