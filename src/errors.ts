export class LahError extends Error {
  constructor(public msg: string, public line?: number, public col?: number) {
    const loc = line !== undefined ? ` (line ${line}${col !== undefined ? `, col ${col}` : ""})` : "";
    super(`${msg}${loc}`);
    this.name = this.constructor.name;
  }
}

export class TokKokError extends LahError {
  constructor(msg: string, line?: number, col?: number) {
    super(`Tok kok lah! ${msg}`, line, col);
  }
}

export class JialatError extends LahError {}
export class BoJioError extends LahError {}
export class SiaoError extends LahError {}
export class TanKuKuError extends LahError {}
export class SuayError extends LahError {}
export class WahLauError extends LahError {}
export class GoneCase extends LahError {}
export class CbError extends LahError {}
export class LanJiaoError extends LahError {}
export class CcbError extends LahError {}
export class ChaoCbError extends LahError {}
