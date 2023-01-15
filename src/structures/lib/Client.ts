import {
  Client,
  Partials,
  ClientEvents,
  ChatInputApplicationCommandData,
  Collection,
  ApplicationCommandSubCommandData,
  ApplicationCommandOptionType,
} from "discord.js";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { Configure, config } from "../../config.js";
import { CommandOptions } from "./Command.js";
import { Event } from "./Event.js";
import { Logger } from "./Logger.js";

export default class extends Client<true> {
  public readonly config: Configure = config;
  public readonly logger: Logger = new Logger("./logs.log");
  public readonly commands: Collection<string, CommandOptions> =
    new Collection();
  public readonly cmds_array: ChatInputApplicationCommandData[] = [];

  constructor() {
    super({
      intents: "3146241",
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
      ],
    });
  }

  public override async login(token: string) {
    this.logger.info("Loading Events", ["Client"]);
    this.loadEvents(`${__dirname}/../../main/events`);

    this.logger.info("Loading Slash Commands", ["Client"]);
    this.loadSlash(`${__dirname}/../../main/slash`);

    return super.login(token);
  }

  protected async import(path: string) {
    return (await import(path))?.default;
  }

  protected async loadEvents(path: string) {
    if ((await stat(path)).isDirectory()) {
      return (await readdir(path)).forEach(async (file: string) => {
        if ((await stat(join(path, file))).isDirectory()) {
          throw new Error(
            "No sub directory allowed in event directory, Exitting..."
          );
        } else {
          const event: Event<keyof ClientEvents> = await this.import(
            join(path, file)
          );

          this.on(event.name, event.run);
          this.logger.info(`"${event.name}" event loaded`, ["Client", "Event"]);
        }
      });
    } else {
      throw new Error("No event directory, Exitting...");
    }
  }

  protected async loadSlash(path: string) {
    let cmd: CommandOptions;
    if ((await stat(path)).isDirectory()) {
      (await readdir(path)).forEach(async (file) => {
        cmd = await this.import(
          `${__dirname}/../../main/slash/${file.replace(".ts", "")}`
        );
        this.commands.set(cmd.name, cmd);
        this.cmds_array.push(cmd);

        this.logger.info(`"${cmd.name}" command loaded`, ["Client", "Slash"]);
      });
    } else {
      throw new Error("Invaild path on slash commands");
    }
  }
}
