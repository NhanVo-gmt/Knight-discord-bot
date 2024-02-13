const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");
const AutoRole = require("../../models/AutoRole");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("autorole-configure")
        .setDescription("Configure your auto-role for this server.")
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('Configure your auto-role for this server.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    run: async ({interaction, client}) => {
        if (!interaction.inGuild())
        {
            interaction.reply('You can only run this command in server.');
            return;
        }

        const targetRoleId = interaction.options.get('role').value;
        try {

            await interaction.deferReply();
            let autoRole = await AutoRole.findOne({guildId: interaction.guild.id});
            if (autoRole) {
                if (autoRole.roleId === targetRoleId)
                {
                    interaction.editReply('Auto role has already been configured for that role. To disable run `/autorole-disable');
                    return;
                }

                autoRole.roleId = targetRoleId;
            }
            else 
            {
                autoRole = new AutoRole({
                    guildId: interaction.guild.id,
                    roleId: targetRoleId,
                });
            }

            await autoRole.save();
            interaction.editReply('Auto role are now configured. To disable run `/autorole-disable');

        } catch (error) {
            console.log(error);
        }
    },

    // /**
    //  * 
    //  * @param {Client} client 
    //  * @param {Interaction} interaction 
    //  */
    // callback: async (client, interaction) => {
    //     if (!interaction.inGuild())
    //     {
    //         interaction.reply('You can only run this command in server.');
    //         return;
    //     }

    //     const targetRoleId = interaction.options.get('role').value;
    //     try {

    //         await interaction.deferReply();
    //         let autoRole = await AutoRole.findOne({guildId: interaction.guild.id});
    //         if (autoRole) {
    //             if (autoRole.roleId === targetRoleId)
    //             {
    //                 interaction.editReply('Auto role has already been configured for that role. To disable run `/autorole-disable');
    //                 return;
    //             }

    //             autoRole.roleId = targetRoleId;
    //         }
    //         else 
    //         {
    //             autoRole = new AutoRole({
    //                 guildId: interaction.guild.id,
    //                 roleId: targetRoleId,
    //             });
    //         }

    //         await autoRole.save();
    //         interaction.editReply('Auto role are now configured. To disable run `/autorole-disable');

    //     } catch (error) {
    //         console.log(error);
    //     }
    // },

    // name: 'autorole-configure',
    // description: 'Configure your auto-role for this server.',
    // options: [
    //     {
    //         name: 'role',
    //         description: 'The role you want users to have',
    //         type: ApplicationCommandOptionType.Role,
    //         required: true
    //     },
    // ],
    // permissionsRequired: [PermissionFlagsBits.Administrator],
    // botPermissions: [PermissionFlagsBits.ManageRoles]
}