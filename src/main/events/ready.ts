import { Guild } from "discord.js";
import { client } from "../..";
import { Event } from "../../structures/lib/Event";

export default new Event({
  name: "ready",
  once: true,
  run() {
    client.logger.info("Ready", ["Client"]);

    /**
     * Benefits of Global and Local
     * Global:
     * 1. The bot can get active badge
     * 2. If any commands was edited, it take 1 or more hours to completely edit it.
     *
     * Local:
     * 1. The bot can not get active badge
     * 2. It can be edited instantly
     */
    if (client.config.global)
      client.application.commands.set(client.cmds_array);
    else {
      client.application.commands.set([]);
      client.guilds.cache.forEach((guild: Guild) => {
        guild.commands.set(client.cmds_array);
      });

      client.on("guildCreate", (guild: Guild) => {
        guild.commands.set(client.cmds_array);
      });

      client.on("guildDelete", (guild: Guild) => {
        guild.commands.set([]);
      });
    }
  },
});
