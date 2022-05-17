import { ButtonInteraction, GuildMember } from "discord.js";
import Button from "../../../../lib/classes/Button.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";

export default class ButtonRole extends Button {
    constructor(client: BetterClient) {
        super("buttonRole", client, {
            clientPermissions: ["MANAGE_ROLES"],
            guildOnly: true
        });
    }

    override async run(interaction: ButtonInteraction) {
        const roleId = interaction.customId.split("-")[1];
        const role =
            interaction.guild!.roles.cache.get(roleId) ||
            (await interaction.guild!.roles.fetch(roleId));
        if (!role) return;

        if ((interaction.member as GuildMember).roles.cache.has(roleId)) {
            await (interaction.member as GuildMember).roles.remove(role);
            return interaction.reply(
                `I have given you the **${role.name}** role!`
            );
        } else {
            await (interaction.member as GuildMember).roles.add(role);
            return interaction.reply(
                `I have removed the **${role.name}** role from you!`
            );
        }
    }
}
