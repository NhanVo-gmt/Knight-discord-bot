const { PermissionFlagsBits, Client, Interaction, SlashCommandBuilder } = require("discord.js");
const AutoRole = require("../../models/AutoRole");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("autorole-disable")
        .setDescription("Disable auto-role in this server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    run: async ({interaction, client}) => {
        try {
            await interaction.deferReply();
            
            if (!(await AutoRole.exists({ guildId: interaction.guild.id})))
            {
                interaction.editReply(`Auto role has not been configure for this server! Use '/autorole-configure to set it up`);
                return;
            }

            await AutoRole.findOneAndDelete( { guildId: interaction.guild.id});
            interaction.editReply(`Auto role has been disabled for this server. Use '/autorole-configure to set it up`);


        } catch (error) {
            console.log(error);
        }
    },


    // name: 'autorole-disable',
    // description: 'Disable auto-role in this server.',
    // permissionsRequired: [PermissionFlagsBits.Administrator]
}