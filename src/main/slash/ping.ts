import { Command } from "../../structures/lib/Command";

const ping = new Command({
  name: "ping",
  description: "Get the bot ping/lagency",
  run({ interaction }) {
    interaction.reply("Pong!");
  },
});

export default ping;
