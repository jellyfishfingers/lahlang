import { describe, it, expect, vi, beforeEach } from "vitest";
import { Lexer } from "../src/lexer";
import { Parser } from "../src/parser";
import { Interpreter } from "../src/interpreter";

describe("New Singlish Features", () => {
  let logSpy: any;
  let warnSpy: any;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  const run = (src: string) => {
    const lexer = new Lexer(src);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    interpreter.run(ast);
  };

  // --- kaypoh (typeof) ---
  describe("kaypoh (typeof)", () => {
    it("should return 'words' for strings", () => {
      run('eh listen lah\n oi kaypoh "hello"\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith("words");
    });

    it("should return 'nombor' for numbers", () => {
      run("eh listen lah\n oi kaypoh 42\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith("nombor");
    });

    it("should return 'can cannot' for booleans", () => {
      run("eh listen lah\n oi kaypoh can\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith("can cannot");
    });

    it("should return 'whole list' for arrays", () => {
      run("eh listen lah\n oi kaypoh [1, 2, 3]\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith("whole list");
    });

    it("should return 'all the things' for objects", () => {
      run("eh listen lah\n oi kaypoh { a: 1 }\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith("all the things");
    });

    it("should return 'bo jio' for null", () => {
      run("eh listen lah\n oi kaypoh bo jio\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith("bo jio");
    });

    it("should return 'blur blur' for undefined", () => {
      run("eh listen lah\n oi kaypoh blur blur\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith("blur blur");
    });

    it("should return 'steady' for functions", () => {
      run(`eh listen lah
        steady lah do this foo() { here take 1 }
        oi kaypoh foo
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith("steady");
    });
  });

  // --- gostan (reverse) ---
  describe("gostan (reverse)", () => {
    it("should reverse a string", () => {
      run('eh listen lah\n oi gostan "hello"\nok lah bye');
      expect(logSpy).toHaveBeenCalledWith("olleh");
    });

    it("should reverse an array", () => {
      run("eh listen lah\n oi gostan [1, 2, 3]\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith([3, 2, 1]);
    });

    it("should throw on non-reversible type", () => {
      expect(() => run("eh listen lah\n oi gostan 42\nok lah bye")).toThrow();
    });
  });

  // --- agak agak (round) ---
  describe("agak agak (round)", () => {
    it("should round down", () => {
      run("eh listen lah\n oi agak agak 3.2\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(3);
    });

    it("should round up", () => {
      run("eh listen lah\n oi agak agak 3.7\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(4);
    });

    it("should round half up", () => {
      run("eh listen lah\n oi agak agak 3.5\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith(4);
    });
  });

  // --- makan (pop) ---
  describe("makan (pop)", () => {
    it("should pop last element from array", () => {
      run(`eh listen lah
        eh got arr = [1, 2, 3]
        oi makan arr
        oi arr
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(3);
      expect(logSpy).toHaveBeenCalledWith([1, 2]);
    });

    it("should throw on non-array", () => {
      expect(() =>
        run('eh listen lah\n oi makan "hello"\nok lah bye'),
      ).toThrow();
    });
  });

  // --- tabao (clone) ---
  describe("tabao (clone)", () => {
    it("should deep clone an array", () => {
      run(`eh listen lah
        eh got orig = [1, 2, 3]
        eh got copy = tabao orig
        eh got r = copy.push(4)
        oi orig
        oi copy
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([1, 2, 3]);
      expect(logSpy).toHaveBeenCalledWith([1, 2, 3, 4]);
    });

    it("should deep clone an object", () => {
      run(`eh listen lah
        eh got orig = { a: 1, b: 2 }
        eh got copy = tabao orig
        eh change copy.a = 99
        oi orig.a
        oi copy.a
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(1);
      expect(logSpy).toHaveBeenCalledWith(99);
    });
  });

  // --- swee (pretty print) ---
  describe("swee (pretty print)", () => {
    it("should pretty print an object", () => {
      logSpy.mockClear();
      run('eh listen lah\n swee { name: "Ah Beng" }\nok lah bye');
      const output = logSpy.mock.calls[0][0];
      expect(output).toContain('"name"');
      expect(output).toContain('"Ah Beng"');
      expect(output).toContain("\n");
    });
  });

  // --- act blur (silent try) ---
  describe("act blur (silent try)", () => {
    it("should silently ignore errors", () => {
      run(`eh listen lah
        act blur {
          jialat throw "This should be ignored"
        }
        oi "still alive"
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith("still alive");
    });

    it("should still execute code before error", () => {
      run(`eh listen lah
        eh got x = 0
        act blur {
          eh change x = 1
          jialat throw "boom"
          eh change x = 2
        }
        oi x
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(1);
    });
  });

  // --- die die must (assert) ---
  describe("die die must (assert)", () => {
    it("should pass on truthy values", () => {
      run("eh listen lah\n die die must can\n oi \"passed\"\nok lah bye");
      expect(logSpy).toHaveBeenCalledWith("passed");
    });

    it("should throw on falsy values", () => {
      expect(() =>
        run("eh listen lah\n die die must cannot\nok lah bye"),
      ).toThrow();
    });
  });

  // --- sian / lepak (sleep) ---
  describe("sian/lepak (sleep)", () => {
    it("should pause execution with sian", () => {
      const start = Date.now();
      run("eh listen lah\n sian 50\nok lah bye");
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(40);
    });

    it("should pause execution with lepak", () => {
      const start = Date.now();
      run("eh listen lah\n lepak 50\nok lah bye");
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(40);
    });
  });

  // --- chope (freeze) ---
  describe("chope (freeze)", () => {
    it("should freeze an object", () => {
      run(`eh listen lah
        eh got obj = { a: 1 }
        chope obj
        oi obj.a
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(1);
    });
  });

  // --- hantam lah ... until (do-while) ---
  describe("hantam lah (do-while)", () => {
    it("should execute body at least once", () => {
      logSpy.mockClear();
      run(`eh listen lah
        eh got x = 100
        hantam lah {
          oi x
          eh change x = x + 1
        } until (x less than 5)
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(100);
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it("should loop while condition is true", () => {
      logSpy.mockClear();
      run(`eh listen lah
        eh got i = 0
        hantam lah {
          oi i
          eh change i = i + 1
        } until (i less than 3)
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(0);
      expect(logSpy).toHaveBeenCalledWith(1);
      expect(logSpy).toHaveBeenCalledWith(2);
      expect(logSpy).toHaveBeenCalledTimes(3);
    });

    it("should support break in do-while", () => {
      logSpy.mockClear();
      run(`eh listen lah
        eh got i = 0
        hantam lah {
          oi i
          confirm or not (i same same 2) {
            siao liao stop
          }
          eh change i = i + 1
        } until (i less than 10)
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledTimes(3);
    });
  });

  // --- sabo (delete) ---
  describe("sabo (delete)", () => {
    it("should delete an object property", () => {
      run(`eh listen lah
        eh got obj = { a: 1, b: 2 }
        sabo obj.b
        oi obj.keys()
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith(["a"]);
    });

    it("should delete array element by index", () => {
      run(`eh listen lah
        eh got arr = [10, 20, 30]
        sabo arr[1]
        oi arr
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith([10, 30]);
    });
  });

  // --- jio (casual call) ---
  describe("jio (casual call)", () => {
    it("should call a function", () => {
      run(`eh listen lah
        steady lah do this greet(name) {
          oi "Hello " + name
        }
        jio greet("World")
      ok lah bye`);
      expect(logSpy).toHaveBeenCalledWith("Hello World");
    });
  });
});
