export enum TokenType {
  // ---------------------------------------------------------------------------
  // PROGRAM STRUCTURE
  // ---------------------------------------------------------------------------
  EH_LISTEN_LAH = "EH_LISTEN_LAH", // eh listen lah      → program start
  OK_LAH_BYE = "OK_LAH_BYE", // ok lah bye         → program end

  // ---------------------------------------------------------------------------
  // VARIABLES & VALUES
  // ---------------------------------------------------------------------------
  EH_GOT = "EH_GOT", // eh got             → declare variable
  CONFIRM_GOT = "CONFIRM_GOT", // confirm got        → declare constant
  EH_CHANGE = "EH_CHANGE", // eh change          → reassign value

  CAN = "CAN", // can                → true
  CANNOT = "CANNOT", // cannot             → false
  BO_JIO = "BO_JIO", // bo jio             → null
  BLUR_BLUR = "BLUR_BLUR", // blur blur          → undefined

  // ---------------------------------------------------------------------------
  // OUTPUT & INPUT
  // ---------------------------------------------------------------------------
  OI = "OI", // oi                 → print to console
  OI_LISTEN = "OI_LISTEN", // oi listen          → verbose/debug print
  ASK_LAH = "ASK_LAH", // ask lah            → read user input

  // ---------------------------------------------------------------------------
  // CONTROL FLOW
  // ---------------------------------------------------------------------------
  CONFIRM_OR_NOT = "CONFIRM_OR_NOT", // confirm or not     → if
  OR_MAYBE = "OR_MAYBE", // or maybe           → else if
  ABUDEN = "ABUDEN", // abuden             → else
  WHICH_ONE_LAH = "WHICH_ONE_LAH", // which one lah      → switch
  IF_ITS = "IF_ITS", // if it's            → case
  LAST_RESORT = "LAST_RESORT", // last resort        → default

  // ---------------------------------------------------------------------------
  // LOOPS
  // ---------------------------------------------------------------------------
  KEEP_GOING_LAH = "KEEP_GOING_LAH", // keep going lah     → while
  ONE_BY_ONE_LAH = "ONE_BY_ONE_LAH", // one by one lah     → for
  EVERY_ONE_ALSO = "EVERY_ONE_ALSO", // every one also     → for...in / foreach
  FROM = "FROM", // from               → loop range start
  TO = "TO", // to                 → loop range end
  IN = "IN", // in                 → used in every one also
  SIAO_LIAO_STOP = "SIAO_LIAO_STOP", // siao liao stop     → break
  KNN_STOP = "KNN_STOP", // knn stop           → hard break (aggressive)
  SKIP_LAH = "SKIP_LAH", // skip lah           → continue

  // ---------------------------------------------------------------------------
  // FUNCTIONS
  // ---------------------------------------------------------------------------
  STEADY_LAH_DO_THIS = "STEADY_LAH_DO_THIS", // steady lah do this → define function
  HERE_TAKE = "HERE_TAKE", // here take          → return
  EH_DO_THIS = "EH_DO_THIS", // eh do this         → call function
  ONE_TIME_ONLY = "ONE_TIME_ONLY", // one time only      → anonymous function

  // ---------------------------------------------------------------------------
  // ERROR HANDLING — WHOLESOME TIER
  // ---------------------------------------------------------------------------
  SEE_HOW_LAH = "SEE_HOW_LAH", // see how lah        → try
  AIYOH_KENA = "AIYOH_KENA", // aiyoh kena         → catch
  CONFIRM_DO = "CONFIRM_DO", // confirm do         → finally
  JIALAT_THROW = "JIALAT_THROW", // jialat throw       → throw error
  PAISEH_WARN = "PAISEH_WARN", // paiseh warn        → non-fatal warning
  HONG_GAN_LAH = "HONG_GAN_LAH", // hong gan lah       → fatal assert 🌶️

  // ---------------------------------------------------------------------------
  // ERROR HANDLING — SPICY TIER 🌶️🌶️🌶️
  // ---------------------------------------------------------------------------
  CB_LAH = "CB_LAH", // cb lah             → minor runtime error
  CCB_THROW = "CCB_THROW", // ccb throw          → throw serious error
  KNN_CRASH = "KNN_CRASH", // kan ni na crash    → unrecoverable crash
  CHAO_CB_ASSERT = "CHAO_CB_ASSERT", // chao cb assert     → angriest assertion
  PUKI_PANIC = "PUKI_PANIC", // puki panic         → nuclear panic
  SI_BEH = "SI_BEH", // si beh             → intensifier prefix
  BABI_INPUT = "BABI_INPUT", // babi input         → garbage input error

  // ---------------------------------------------------------------------------
  // ERROR TYPES (built-in error classes)
  // ---------------------------------------------------------------------------
  JIALAT_ERROR = "JIALAT_ERROR", // JialatError        → generic error
  BO_JIO_ERROR = "BO_JIO_ERROR", // BoJioError         → null reference
  SIAO_ERROR = "SIAO_ERROR", // SiaoError          → type error
  TOK_KOK_ERROR = "TOK_KOK_ERROR", // TokKokError        → syntax error
  TAN_KU_KU_ERROR = "TAN_KU_KU_ERROR", // TanKuKuError       → timeout
  SUAY_ERROR = "SUAY_ERROR", // SuayError          → out of bounds
  WAH_LAU_ERROR = "WAH_LAU_ERROR", // WahLauError        → stack overflow
  GONE_CASE = "GONE_CASE", // GoneCase           → fatal crash
  CB_ERROR = "CB_ERROR", // CbError            → mild runtime error 🌶️
  LAN_JIAO_ERROR = "LAN_JIAO_ERROR", // LanJiaoError       → garbage value 🌶️
  CCB_ERROR = "CCB_ERROR", // CcbError           → serious error 🌶️

  // ---------------------------------------------------------------------------
  // OPERATORS
  // ---------------------------------------------------------------------------
  SAME_SAME = "SAME_SAME", // same same          → ==
  NOT_SAME = "NOT_SAME", // not same           → !=
  AND_ALSO = "AND_ALSO", // and also           → &&
  OR_CAN = "OR_CAN", // or can             → ||
  DUN_WANT = "DUN_WANT", // dun want           → !
  MORE_THAN = "MORE_THAN", // more than          → >
  LESS_THAN = "LESS_THAN", // less than          → <
  MORE_THAN_EQUAL = "MORE_THAN_EQUAL", // more than or same  → >=
  LESS_THAN_EQUAL = "LESS_THAN_EQUAL", // less than or same  → <=
  ADD_SOME_MORE = "ADD_SOME_MORE", // add some more      → +=
  MINUS_A_BIT = "MINUS_A_BIT", // minus a bit        → -=
  EQUALS = "EQUALS", // =                  → assignment
  PLUS = "PLUS", // +
  MINUS = "MINUS", // -
  MULTIPLY = "MULTIPLY", // *
  DIVIDE = "DIVIDE", // /
  MODULO = "MODULO", // %

  // ---------------------------------------------------------------------------
  // TYPES
  // ---------------------------------------------------------------------------
  WORDS = "WORDS", // words              → string
  NOMBOR = "NOMBOR", // nombor             → number (Malay)
  CAN_CANNOT = "CAN_CANNOT", // can cannot         → boolean
  WHOLE_LIST = "WHOLE_LIST", // whole list         → array
  ALL_THE_THINGS = "ALL_THE_THINGS", // all the things     → object/dict

  // ---------------------------------------------------------------------------
  // META
  // ---------------------------------------------------------------------------
  CHIONG_BRING_IN = "CHIONG_BRING_IN", // chiong bring in    → import
  SHARE_OUT = "SHARE_OUT", // share out          → export
  EH_CHECK_THIS = "EH_CHECK_THIS", // eh check this      → debug / inspect
  OLD_LIAO = "OLD_LIAO", // old liao           → deprecated

  // ---------------------------------------------------------------------------
  // LITERALS & IDENTIFIERS
  // ---------------------------------------------------------------------------
  NUMBER = "NUMBER",
  STRING = "STRING",
  IDENTIFIER = "IDENTIFIER",

  // ---------------------------------------------------------------------------
  // PUNCTUATION
  // ---------------------------------------------------------------------------
  SEMICOLON = "SEMICOLON", // ;
  LAH = "LAH", // lah  → optional statement terminator
  COLON = "COLON", // :
  COMMA = "COMMA", // ,
  DOT = "DOT", // .
  LPAREN = "LPAREN", // (
  RPAREN = "RPAREN", // )
  LBRACE = "LBRACE", // {
  RBRACE = "RBRACE", // }
  LBRACKET = "LBRACKET", // [
  RBRACKET = "RBRACKET", // ]

  // ---------------------------------------------------------------------------
  // COMMENTS
  // ---------------------------------------------------------------------------
  COMMENT = "COMMENT", // // shiok: ...
  MULTILINE_COMMENT = "MULTILINE_COMMENT", // wahlau start ... wahlau end

  EOF = "EOF",
}

// ---------------------------------------------------------------------------
// Token interface
// ---------------------------------------------------------------------------
export interface Token {
  type: TokenType;
  value: string;
  line: number;
  col: number;
}

// ---------------------------------------------------------------------------
// Keyword map — maps raw source strings → TokenTypes
// IMPORTANT: ordered longest-first so the lexer matches greedily.
// e.g. "oi listen" must come before "oi" or it will never match.
// ---------------------------------------------------------------------------
export const KEYWORDS: [string, TokenType][] = [
  // Program structure
  ["eh listen lah", TokenType.EH_LISTEN_LAH],
  ["ok lah bye", TokenType.OK_LAH_BYE],

  // Variables
  ["confirm got", TokenType.CONFIRM_GOT],
  ["eh change", TokenType.EH_CHANGE],
  ["eh got", TokenType.EH_GOT],
  ["blur blur", TokenType.BLUR_BLUR],
  ["bo jio", TokenType.BO_JIO],
  ["can cannot", TokenType.CAN_CANNOT],
  ["cannot", TokenType.CANNOT],
  ["can", TokenType.CAN],

  // Output & input
  ["oi listen", TokenType.OI_LISTEN],
  ["ask lah", TokenType.ASK_LAH],
  ["oi", TokenType.OI],

  // Control flow
  ["confirm or not", TokenType.CONFIRM_OR_NOT],
  ["abuden", TokenType.ABUDEN],
  ["which one lah", TokenType.WHICH_ONE_LAH],
  ["or maybe", TokenType.OR_MAYBE],
  ["if it's", TokenType.IF_ITS],
  ["last resort", TokenType.LAST_RESORT],

  // Loops
  ["keep going lah", TokenType.KEEP_GOING_LAH],
  ["one by one lah", TokenType.ONE_BY_ONE_LAH],
  ["every one also", TokenType.EVERY_ONE_ALSO],
  ["siao liao stop", TokenType.SIAO_LIAO_STOP],
  ["knn stop", TokenType.KNN_STOP],
  ["skip lah", TokenType.SKIP_LAH],
  ["from", TokenType.FROM],
  ["to", TokenType.TO],
  ["in", TokenType.IN],

  // Functions
  ["steady lah do this", TokenType.STEADY_LAH_DO_THIS],
  ["here take", TokenType.HERE_TAKE],
  ["eh do this", TokenType.EH_DO_THIS],
  ["one time only", TokenType.ONE_TIME_ONLY],

  // Error handling — wholesome
  ["see how lah", TokenType.SEE_HOW_LAH],
  ["aiyoh kena", TokenType.AIYOH_KENA],
  ["confirm do", TokenType.CONFIRM_DO],
  ["jialat throw", TokenType.JIALAT_THROW],
  ["paiseh warn", TokenType.PAISEH_WARN],
  ["hong gan lah", TokenType.HONG_GAN_LAH],

  // Error handling — spicy 🌶️ (longest first)
  ["chao cb assert", TokenType.CHAO_CB_ASSERT],
  ["kan ni na crash", TokenType.KNN_CRASH],
  ["ccb throw", TokenType.CCB_THROW],
  ["puki panic", TokenType.PUKI_PANIC],
  ["babi input", TokenType.BABI_INPUT],
  ["si beh", TokenType.SI_BEH],
  ["cb lah", TokenType.CB_LAH],

  // Error types
  ["TanKuKuError", TokenType.TAN_KU_KU_ERROR],
  ["LanJiaoError", TokenType.LAN_JIAO_ERROR],
  ["TokKokError", TokenType.TOK_KOK_ERROR],
  ["WahLauError", TokenType.WAH_LAU_ERROR],
  ["JialatError", TokenType.JIALAT_ERROR],
  ["BoJioError", TokenType.BO_JIO_ERROR],
  ["SuayError", TokenType.SUAY_ERROR],
  ["SiaoError", TokenType.SIAO_ERROR],
  ["CcbError", TokenType.CCB_ERROR],
  ["CbError", TokenType.CB_ERROR],
  ["GoneCase", TokenType.GONE_CASE],

  // Operators (longest first)
  ["more than or same", TokenType.MORE_THAN_EQUAL],
  ["less than or same", TokenType.LESS_THAN_EQUAL],
  ["add some more", TokenType.ADD_SOME_MORE],
  ["minus a bit", TokenType.MINUS_A_BIT],
  ["same same", TokenType.SAME_SAME],
  ["not same", TokenType.NOT_SAME],
  ["and also", TokenType.AND_ALSO],
  ["dun want", TokenType.DUN_WANT],
  ["or can", TokenType.OR_CAN],
  ["more than", TokenType.MORE_THAN],
  ["less than", TokenType.LESS_THAN],

  // Types (longest first)
  ["all the things", TokenType.ALL_THE_THINGS],
  ["whole list", TokenType.WHOLE_LIST],
  ["nombor", TokenType.NOMBOR],
  ["words", TokenType.WORDS],

  // Meta (longest first)
  ["chiong bring in", TokenType.CHIONG_BRING_IN],
  ["eh check this", TokenType.EH_CHECK_THIS],
  ["share out", TokenType.SHARE_OUT],
  ["old liao", TokenType.OLD_LIAO],

  // Statement terminator (must be last — very short, easy false match)
  ["lah", TokenType.LAH],
];
