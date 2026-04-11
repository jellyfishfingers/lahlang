import { describe, it, expect, vi, beforeEach } from "vitest";
import { Lexer } from "../src/lexer";
import { Parser } from "../src/parser";
import { Interpreter } from "../src/interpreter";
import * as fs from "fs";
import * as path from "path";

describe("E2E Tests — Full .lah Programs", () => {
  let logSpy: any;
  let warnSpy: any;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  const runFile = (filePath: string) => {
    const source = fs.readFileSync(
      path.join(__dirname, "..", filePath),
      "utf-8",
    );
    run(source);
  };

  const run = (source: string) => {
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    interpreter.run(ast);
  };

  // --- Existing examples should still pass ---
  describe("Existing examples (regression)", () => {
    it("should run hello.lah", () => {
      runFile("examples/1. hello.lah");
      expect(logSpy).toHaveBeenCalledWith("Hello World");
    });

    it("should run fizzbuzz.lah", () => {
      runFile("examples/2. fizzbuzz.lah");
      expect(logSpy).toHaveBeenCalledWith("FizzBuzz");
      expect(logSpy).toHaveBeenCalledWith("Fizz");
      expect(logSpy).toHaveBeenCalledWith("Buzz");
    });

    it("should run fibonacci.lah", () => {
      runFile("examples/3. fibonacci.lah");
      expect(logSpy).toHaveBeenCalledWith(13);
    });

    it("should run data_structures.lah", () => {
      runFile("examples/4. data_structures.lah");
      expect(logSpy).toHaveBeenCalled();
    });

    it("should run advanced_logic.lah", () => {
      runFile("examples/5. advanced_logic.lah");
      expect(logSpy).toHaveBeenCalledWith("Counter 1:");
      expect(logSpy).toHaveBeenCalledWith(11);
      expect(logSpy).toHaveBeenCalledWith(12);
    });
  });

  // --- New example files ---
  describe("New Singlish examples", () => {
    it("should run singlish_extras.lah", () => {
      runFile("examples/9. singlish_extras.lah");

      // kaypoh results
      expect(logSpy).toHaveBeenCalledWith("words");
      expect(logSpy).toHaveBeenCalledWith("nombor");
      expect(logSpy).toHaveBeenCalledWith("can cannot");
      expect(logSpy).toHaveBeenCalledWith("whole list");
      expect(logSpy).toHaveBeenCalledWith("all the things");
      expect(logSpy).toHaveBeenCalledWith("bo jio");

      // gostan results
      expect(logSpy).toHaveBeenCalledWith("olleh");
      expect(logSpy).toHaveBeenCalledWith([5, 4, 3, 2, 1]);

      // agak agak results
      expect(logSpy).toHaveBeenCalledWith(4); // 3.7 → 4
      expect(logSpy).toHaveBeenCalledWith(3); // 3.2 → 3

      // act blur — should continue running
      expect(logSpy).toHaveBeenCalledWith("Still running after act blur!");

      // die die must — should pass
      expect(logSpy).toHaveBeenCalledWith("Assertion passed!");

      // sian — should wake up
      expect(logSpy).toHaveBeenCalledWith("Woke up already!");
    });

    it("should run built_in_methods.lah", () => {
      logSpy.mockClear();
      runFile("examples/10. built_in_methods.lah");

      // String methods
      expect(logSpy).toHaveBeenCalledWith("HELLO WORLD");
      expect(logSpy).toHaveBeenCalledWith("hello world");
      expect(logSpy).toHaveBeenCalledWith(true); // includes
      expect(logSpy).toHaveBeenCalledWith("hello Singapore");
      expect(logSpy).toHaveBeenCalledWith(["hello", "world"]);
      expect(logSpy).toHaveBeenCalledWith("hello"); // slice

      // Array methods
      expect(logSpy).toHaveBeenCalledWith("3 - 1 - 4 - 1 - 5 - 9"); // join(" - ") on nums

      // Math built-ins
      expect(logSpy).toHaveBeenCalledWith(4); // round(3.7)
      expect(logSpy).toHaveBeenCalledWith(3); // floor(3.7)
      expect(logSpy).toHaveBeenCalledWith(1024); // pow(2,10)
      expect(logSpy).toHaveBeenCalledWith(12); // sqrt(144)

      // Type conversion
      expect(logSpy).toHaveBeenCalledWith(50); // to_nombor("42") + 8
      expect(logSpy).toHaveBeenCalledWith("123"); // to_words(123)

      // panjang
      expect(logSpy).toHaveBeenCalledWith(5); // panjang("hello")
    });

    it("should run do_while_and_sabo.lah", () => {
      runFile("examples/11. do_while_and_sabo.lah");

      // hantam lah prints 0-4
      expect(logSpy).toHaveBeenCalledWith(0);
      expect(logSpy).toHaveBeenCalledWith(1);
      expect(logSpy).toHaveBeenCalledWith(2);
      expect(logSpy).toHaveBeenCalledWith(3);
      expect(logSpy).toHaveBeenCalledWith(4);

      // hantam at least once
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining("This runs at least once!"),
      );

      // jio
      expect(logSpy).toHaveBeenCalledWith("Eh Ah Lian, come eat lah!");
      expect(logSpy).toHaveBeenCalledWith("Eh Ah Beng, come eat lah!");
    });
  });

  // --- Full program E2E scenarios ---
  describe("Complex E2E scenarios", () => {
    it("should handle a full program with multiple new features", () => {
      const src = `eh listen lah
        // shiok: Shopping list program using new features

        eh got items = ["chicken rice", "laksa", "nasi lemak", "roti prata"]
        eh got prices = [5, 7, 4, 3]

        // shiok: Use kaypoh to check types
        die die must kaypoh items same same "whole list"
        die die must kaypoh prices same same "whole list"

        // shiok: Use bracket indexing
        oi items[0] + " costs $" + to_words(prices[0])

        // shiok: Use gostan to reverse
        oi gostan items

        // shiok: Use agak agak to round average price
        eh got total = prices.reduce(one time only (acc, p) {
          here take acc + p
        }, 0)
        eh got avg = total / panjang(prices)
        oi "Average price: $" + to_words(agak agak avg)

        // shiok: Use map and filter
        eh got expensive = items.filter(one time only (item) {
          eh got idx = items.indexOf(item)
          here take prices[idx] more than 4
        })
        oi "Expensive items:"
        oi expensive

        // shiok: Use tabao to clone before makan
        eh got backup = tabao items
        eh got eaten = makan items
        oi "Just ate: " + eaten
        oi "Remaining: " + to_words(panjang(items)) + " items"
        oi "Backup still has: " + to_words(panjang(backup)) + " items"

        // shiok: Use act blur for safety
        act blur {
          eh got empty = []
          eh got x = makan empty
        }
        oi "Survived act blur!"

        // shiok: do-while to count down
        eh got countdown = 3
        hantam lah {
          oi countdown
          eh change countdown = countdown - 1
        } until (countdown more than 0)
        oi "Blast off!"

      ok lah bye`;

      run(src);

      expect(logSpy).toHaveBeenCalledWith("chicken rice costs $5");
      expect(logSpy).toHaveBeenCalledWith([
        "roti prata",
        "nasi lemak",
        "laksa",
        "chicken rice",
      ]);
      expect(logSpy).toHaveBeenCalledWith("Average price: $5");
      expect(logSpy).toHaveBeenCalledWith("Expensive items:");
      expect(logSpy).toHaveBeenCalledWith(["chicken rice", "laksa"]);
      expect(logSpy).toHaveBeenCalledWith("Just ate: roti prata");
      expect(logSpy).toHaveBeenCalledWith("Remaining: 3 items");
      expect(logSpy).toHaveBeenCalledWith("Backup still has: 4 items");
      expect(logSpy).toHaveBeenCalledWith("Survived act blur!");
      expect(logSpy).toHaveBeenCalledWith(3);
      expect(logSpy).toHaveBeenCalledWith(2);
      expect(logSpy).toHaveBeenCalledWith(1);
      expect(logSpy).toHaveBeenCalledWith("Blast off!");
    });

    it("should handle string escapes in full program", () => {
      const src = `eh listen lah
        oi "Line 1\\nLine 2"
        oi "Tab\\there"
        oi "Quote: \\"hello\\""
        oi "Backslash: \\\\"
      ok lah bye`;

      run(src);

      expect(logSpy).toHaveBeenCalledWith("Line 1\nLine 2");
      expect(logSpy).toHaveBeenCalledWith("Tab\there");
      expect(logSpy).toHaveBeenCalledWith('Quote: "hello"');
      expect(logSpy).toHaveBeenCalledWith("Backslash: \\");
    });

    it("should handle method chaining in full program", () => {
      const src = `eh listen lah
        eh got csv = "Alice,Bob,Charlie,Dave"
        eh got names = csv.split(",")
        eh got upper_names = names.map(one time only (n) {
          here take n.upper()
        })
        oi upper_names.join(" | ")
        oi upper_names.length
        oi upper_names.includes("BOB")
        oi upper_names.indexOf("CHARLIE")
      ok lah bye`;

      run(src);

      expect(logSpy).toHaveBeenCalledWith("ALICE | BOB | CHARLIE | DAVE");
      expect(logSpy).toHaveBeenCalledWith(4);
      expect(logSpy).toHaveBeenCalledWith(true);
      expect(logSpy).toHaveBeenCalledWith(2);
    });

    it("should handle nested data structures with bracket indexing", () => {
      const src = `eh listen lah
        eh got matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        oi matrix[0]
        oi matrix[1][1]
        oi matrix[2][2]
        eh change matrix[1][1] = 99
        oi matrix[1]
      ok lah bye`;

      run(src);

      expect(logSpy).toHaveBeenCalledWith([1, 2, 3]);
      expect(logSpy).toHaveBeenCalledWith(5);
      expect(logSpy).toHaveBeenCalledWith(9);
      expect(logSpy).toHaveBeenCalledWith([4, 99, 6]);
    });

    it("should handle REPL-style parsing", () => {
      const src = `eh got x = 42
        oi x`;

      const lexer = new Lexer(src);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
      const stmts = parser.parseREPL();
      const interpreter = new Interpreter();
      interpreter.runStatements(stmts);

      expect(logSpy).toHaveBeenCalledWith(42);
    });
  });
});
