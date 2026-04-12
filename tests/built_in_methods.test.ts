import { describe, it, expect, vi, beforeEach } from "vitest";
import { Lexer } from "../src/lexer";
import { Parser } from "../src/parser";
import { Interpreter } from "../src/interpreter";

describe("Built-in Methods & Features", () => {
  let logSpy: any;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  const run = (src: string) => {
    const lexer = new Lexer(src);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    interpreter.run(ast);
  };

  // --- String methods ---
  describe("String methods", () => {
    it("upper() should uppercase", () => {
      run('eh listen lah\n oi "hello".upper()\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith("HELLO");
    });

    it("lower() should lowercase", () => {
      run('eh listen lah\n oi "HELLO".lower()\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith("hello");
    });

    it("trim() should trim whitespace", () => {
      run('eh listen lah\n oi "  hello  ".trim()\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith("hello");
    });

    it("split() should split string", () => {
      run('eh listen lah\n oi "a,b,c".split(",")\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith(["a", "b", "c"]);
    });

    it("includes() should check substring", () => {
      run('eh listen lah\n oi "hello world".includes("world")\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith(true);
    });

    it("replace() should replace substring", () => {
      run('eh listen lah\n oi "hello world".replace("world", "lah")\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith("hello lah");
    });

    it("slice() should slice string", () => {
      run('eh listen lah\n oi "hello".slice(1, 3)\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith("el");
    });

    it("indexOf() should find index", () => {
      run('eh listen lah\n oi "hello".indexOf("ll")\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith(2);
    });

    it("startsWith() should check prefix", () => {
      run('eh listen lah\n oi "hello".startsWith("hel")\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith(true);
    });

    it("endsWith() should check suffix", () => {
      run('eh listen lah\n oi "hello".endsWith("llo")\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith(true);
    });

    it("charAt() should get character", () => {
      run('eh listen lah\n oi "hello".charAt(1)\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith("e");
    });

    it("repeat() should repeat string", () => {
      run('eh listen lah\n oi "ha".repeat(3)\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith("hahaha");
    });
  });

  // --- Array methods ---
  describe("Array methods", () => {
    it("push() should add element", () => {
      run(`eh listen lah
        eh got arr = [1, 2]
        eh got result = arr.push(3)
        oi arr
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([1, 2, 3]);
    });

    it("pop() should remove last element", () => {
      run(`eh listen lah
        eh got arr = [1, 2, 3]
        eh got last = arr.pop()
        oi last
        oi arr
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(3);
      expect(logSpy).toHaveBeenCalledWith([1, 2]);
    });

    it("shift() should remove first element", () => {
      run(`eh listen lah
        eh got arr = [1, 2, 3]
        eh got first = arr.shift()
        oi first
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(1);
    });

    it("reverse() should reverse array", () => {
      run(`eh listen lah
        eh got arr = [1, 2, 3]
        oi arr.reverse()
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([3, 2, 1]);
    });

    it("join() should join array", () => {
      run(`eh listen lah
        oi [1, 2, 3].join("-")
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith("1-2-3");
    });

    it("includes() should check membership", () => {
      run(`eh listen lah
        oi [1, 2, 3].includes(2)
        oi [1, 2, 3].includes(5)
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(true);
      expect(logSpy).toHaveBeenCalledWith(false);
    });

    it("slice() should slice array", () => {
      run(`eh listen lah
        oi [10, 20, 30, 40].slice(1, 3)
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([20, 30]);
    });

    it("indexOf() should find index", () => {
      run(`eh listen lah
        oi [10, 20, 30].indexOf(20)
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(1);
    });

    it("map() should transform array", () => {
      run(`eh listen lah
        eh got result = [1, 2, 3].map(one time only (x) {
          here take x * 2
        })
        oi result
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([2, 4, 6]);
    });

    it("filter() should filter array", () => {
      run(`eh listen lah
        eh got result = [1, 2, 3, 4, 5].filter(one time only (x) {
          here take x more than 3
        })
        oi result
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([4, 5]);
    });

    it("some() should check if any match", () => {
      run(`eh listen lah
        oi [1, 2, 3].some(one time only (x) { here take x more than 2 })
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(true);
    });

    it("every() should check if all match", () => {
      run(`eh listen lah
        oi [1, 2, 3].every(one time only (x) { here take x more than 0 })
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(true);
    });

    it("reduce() should accumulate", () => {
      run(`eh listen lah
        eh got sum = [1, 2, 3, 4].reduce(one time only (acc, x) {
          here take acc + x
        }, 0)
        oi sum
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(10);
    });

    it("concat() should concatenate arrays", () => {
      run(`eh listen lah
        oi [1, 2].concat([3, 4])
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([1, 2, 3, 4]);
    });
  });

  // --- Object methods ---
  describe("Object methods", () => {
    it("keys() should return keys", () => {
      run(`eh listen lah
        eh got obj = { a: 1, b: 2 }
        oi obj.keys()
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(["a", "b"]);
    });

    it("values() should return values", () => {
      run(`eh listen lah
        eh got obj = { a: 1, b: 2 }
        oi obj.values()
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([1, 2]);
    });

    it("entries() should return entries", () => {
      run(`eh listen lah
        eh got obj = { a: 1 }
        oi obj.entries()
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([["a", 1]]);
    });
  });

  // --- Bracket indexing ---
  describe("Bracket indexing", () => {
    it("should access array by index", () => {
      run(`eh listen lah
        eh got arr = [10, 20, 30]
        oi arr[0]
        oi arr[2]
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(10);
      expect(logSpy).toHaveBeenCalledWith(30);
    });

    it("should access string by index", () => {
      run(`eh listen lah
        eh got s = "abc"
        oi s[1]
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith("b");
    });

    it("should assign to array index", () => {
      run(`eh listen lah
        eh got arr = [1, 2, 3]
        eh change arr[1] = 99
        oi arr
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([1, 99, 3]);
    });

    it("should work with computed indices", () => {
      run(`eh listen lah
        eh got arr = [10, 20, 30]
        eh got i = 1
        oi arr[i]
        oi arr[i + 1]
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(20);
      expect(logSpy).toHaveBeenCalledWith(30);
    });
  });

  // --- Math built-ins ---
  describe("Math built-ins", () => {
    it("round() should round", () => {
      run("eh listen lah\n oi round(3.7)\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(4);
    });

    it("floor() should floor", () => {
      run("eh listen lah\n oi floor(3.9)\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(3);
    });

    it("ceil() should ceil", () => {
      run("eh listen lah\n oi ceil(3.1)\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(4);
    });

    it("abs() should absolute value", () => {
      run("eh listen lah\n oi abs(-5)\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(5);
    });

    it("pow() should power", () => {
      run("eh listen lah\n oi pow(2, 8)\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(256);
    });

    it("sqrt() should square root", () => {
      run("eh listen lah\n oi sqrt(144)\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(12);
    });

    it("min() should find minimum", () => {
      run("eh listen lah\n oi min(3, 1, 4)\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(1);
    });

    it("max() should find maximum", () => {
      run("eh listen lah\n oi max(3, 1, 4)\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(4);
    });

    it("random() should return 0-1", () => {
      run("eh listen lah\n eh got r = random()\n oi r more than or same 0 and also r less than 1\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(true);
    });
  });

  // --- Type conversion ---
  describe("Type conversion", () => {
    it("to_nombor() should convert to number", () => {
      run('eh listen lah\n oi to_nombor("42") + 8\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith(50);
    });

    it("to_words() should convert to string", () => {
      run("eh listen lah\n oi to_words(123)\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith("123");
    });

    it("to_can_cannot() should convert to boolean", () => {
      run("eh listen lah\n oi to_can_cannot(1)\n oi to_can_cannot(0)\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(true);
      expect(logSpy).toHaveBeenCalledWith(false);
    });
  });

  // --- panjang (length) ---
  describe("panjang (length)", () => {
    it("should return string length", () => {
      run('eh listen lah\n oi panjang("hello")\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith(5);
    });

    it("should return array length", () => {
      run("eh listen lah\n oi panjang([1, 2, 3])\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(3);
    });

    it("should return object key count", () => {
      run("eh listen lah\n oi panjang({ a: 1, b: 2 })\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(2);
    });
  });

  // --- .length property ---
  describe(".length property", () => {
    it("should work on arrays", () => {
      run("eh listen lah\n oi [1, 2, 3].length\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(3);
    });

    it("should work on strings", () => {
      run('eh listen lah\n oi "hello".length\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith(5);
    });
  });

  // --- Method chaining ---
  describe("Method chaining", () => {
    it("should support chained method calls", () => {
      run('eh listen lah\n oi "hello world".upper().split(" ")\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith(["HELLO", "WORLD"]);
    });

    it("should support chained property and method", () => {
      run('eh listen lah\n oi "a,b,c".split(",").length\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith(3);
    });
  });
});
