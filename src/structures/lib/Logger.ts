import chalk from "chalk";
import winston from "winston";

export class Logger {
  private readonly file: winston.Logger;
  constructor(filename: string) {
    this.file = winston.createLogger({
      transports: [new winston.transports.File({ filename })],
    });
  }

  public info(text: string, groups?: string[]): void {
    this.write("info", text, groups);
  }

  public debug(text: string, groups?: string[]): void {
    this.write("debug", text, groups);
  }

  public error(text: string, groups?: string[]): void {
    this.write("error", text, groups);
  }

  public warn(text: string, groups?: string[]): void {
    this.write("warn", text, groups);
  }

  protected write(level: logTypes, text: string, groups?: string[]): void {
    const d = new Date();

    let dStr = `${d.getUTCFullYear()}-${
      d.getMonth() + 1
    }-${d.getUTCDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    let lvl: string;
    switch (level) {
      case "info":
        lvl = chalk.green("INFO");
        break;

      case "debug":
        lvl = chalk.blue("DEBUG");
        break;

      case "error":
        lvl = chalk.red("ERROR");
        break;

      case "warn":
        lvl = chalk.red("WARN");
        break;
    }

    if (groups) {
      console.log(`[${dStr} ${lvl}] [${groups.join(" ")}] ${text}`);
    } else {
      console.log(`[${dStr} ${lvl}] ${text}`);
    }

    this.file.log({
      level,
      message: text,
      date: dStr,
    });
  }
}

export type logTypes = "info" | "error" | "warn" | "debug";
