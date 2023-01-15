import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  PermissionResolvable,
} from "discord.js";
import Client from "./Client";

export interface RunOptions {
  client: Client;
  interaction: CommandInteraction;
  options: CommandInteractionOptionResolver;
}

export type CommandOptions = {
  permissions?: {
    member?: PermissionResolvable[];
    bot?: PermissionResolvable[];
  };
  run?: (options: RunOptions) => void;
} & ChatInputApplicationCommandData;

export class Command {
  constructor(options: CommandOptions) {
    Object.assign(this, options);
  }
}
