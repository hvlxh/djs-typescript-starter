import { ClientEvents } from "discord.js";
import Client from "./Client";

export interface Options<Key extends keyof ClientEvents> {
  name: Key;
  nick?: string;
  once?: boolean;
  run: (...args: ClientEvents[Key]) => any;
}

export class Event<Key extends keyof ClientEvents> {
  name: Key;
  nick?: string;
  once?: boolean;
  run: (...args: ClientEvents[Key]) => any;
  constructor(options: Options<Key>) {
    this.name = options.name;
    this.nick = options.nick;
    this.once = options.once;
    this.run = options.run;

    return this;
  }
}
