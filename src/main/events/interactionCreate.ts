import { CommandInteractionOptionResolver, Interaction } from "discord.js";
import { client } from "../..";
import { Event } from "../../structures/lib/Event";

export default new Event({
  name: "interactionCreate",
  once: true,
  run(interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      const cmd = client.commands.get(interaction.commandName);

      if (!cmd)
        return interaction.reply({
          content: "This commands doesn't exist...",
          ephemeral: true,
        });

      cmd.run!({
        client,
        interaction,
        options: interaction.options as CommandInteractionOptionResolver,
      });
    }
  },
});
