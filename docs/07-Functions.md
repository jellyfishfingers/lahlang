# Functions 🛠️

Functions in Lahlang allow you to package logic into reusable "steady" blocks.

## Defining a Function

Use `steady lah do this` to define a function.

```lah
steady lah do this sayHello(name) {
  oi "Hello " + name + " lah!";
}
```

---

## Calling a Function

Use `eh do this` followed by the function name.

```lah
eh do this sayHello("Suryansh");
```

---

## Returning Values

Use `here take` to return a value from a function.

```lah
steady lah do this addNumbers(a, b) {
  here take a + b;
}

eh got result = eh do this addNumbers(5, 10);
oi result;
```

---

## Anonymous Functions

You can also create functions on the fly using `one time only`.

```lah
eh got greet = one time only (name) {
  oi "Hi " + name;
};

eh do this greet("Friend");
```

---

## Next Steps

Your code is now modular and organized. But what happens when things go wrong?

👉 [Learn Error Handling](./08-Error-Handling.md)
