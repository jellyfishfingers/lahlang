# Variables and Types 📦

In Lahlang, we have specific ways to declare data and unique names for types.

## Variable Declaration

### `eh got` (Mutable)
Use `eh got` for variables that can change later.

```lah
eh got score = 10;
eh change score = 20; // Use 'eh change' to reassign
```

### `confirm got` (Constant)
Use `confirm got` for values that should never change.

```lah
confirm got PI = 3.14;
// eh change PI = 4; // This will throw an error!
```

---

## Data Types

Lahlang supports several built-in types:

| Singlish Keyword | Traditional Name | Description |
| :--- | :--- | :--- |
| `nombor` | Number | Integers or decimals (e.g., `5`, `3.14`). |
| `words` | String | Text wrapped in quotes (e.g., `"shiok"`). |
| `can cannot` | Boolean | Logic values (`can` or `cannot`). |
| `whole list` | Array | A collection of items (e.g., `[1, 2, 3]`). |
| `all the things` | Object | Key-value pairs (e.g., `{ name: "Makan" }`). |
| `bo jio` | Null | Represents an empty or null value. |
| `blur blur` | Undefined | Represents an undefined value. |

---

## Usage Examples

### Booleans
Instead of `true` and `false`, we use `can` and `cannot`.

```lah
eh got is_hungry = can;
eh got is_tired = cannot;
```

### Lists (Arrays)
```lah
eh got tabao_list = ["Chicken Rice", "Laksa", "Kopi O"];
oi tabao_list[0]; // Prints "Chicken Rice"
```

### Objects
```lah
eh got stall = {
  name: "Maxwell Chicken Rice",
  price: 5.50,
  halal: can
};
oi stall.name;
```

---

## Next Steps

Great! You know how to store data. Now let's learn how to make decisions with it.

👉 [Explore Control Flow](./05-Control-Flow.md)
