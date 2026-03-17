# Getting Started with Lahlang 🚀

Ready to write your first program? Let's break down the basic structure of a Lahlang script.

## The Program Structure

Every Lahlang program **MUST** start and end with specific keywords. This is like saying "Hello" and "Goodbye" to the interpreter.

```lah
eh listen lah
  // Your code goes here
ok lah bye
```

- `eh listen lah`: This tells the interpreter to start listening to your commands.
- `ok lah bye`: This signals the end of the program.

---

## Your First Program: Hello World

Create a file named `hello.lah` and add the following:

```lah
eh listen lah
  oi "Hello World";
ok lah bye
```

### Explanation:
- `oi`: This is the command to print or output text to the console. Think of it as `console.log` or `print`.
- `;`: Statements should end with a semicolon (though the interpreter is sometimes flexible, it's good practice).

---

## Running Your Program

Open your terminal and run:

```bash
lahlang hello.lah
```

You should see:
```text
Hello World
```

---

## Adding Comments

You can add notes to your code that the interpreter will ignore.

### Single-line Comment
```lah
// shiok: This is a comment
oi "Working lah!";
```

### Multi-line Comment
```lah
wahlau start
  This is a long story
  about why I am coding
  in Singlish.
wahlau end
oi "Finished reading?";
```

---

## Next Steps

Now that you know the basics, let's learn how to store data.

👉 [Learn about Variables and Types](./04-Variables-and-Types.md)
