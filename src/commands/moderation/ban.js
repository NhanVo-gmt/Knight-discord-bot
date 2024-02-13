const {ApplicationCommandOptionType, PermissionFlagsBits, Client, Interaction, SlashCommandBuilder} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bans a Knight from the their adventure!")
        .addMentionableOption(option => 
            option.setName('target-user')
                .setDescription('The user to ban.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason to ban'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        ,

    run: async ({interaction, client}) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "No reason to provided";
        await interaction.deferReply();
        
        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser)
        {
            await interaction.editReply("You can't ban that user because they are unavailble");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId)
        {
            await interaction.editReply("You can't ban that user because they are not the owner");
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; // Get the highest position of the target user
        const requestUserRolePosition = interaction.member.roles.highest.position; // Get highest position of the command user
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // Get position of bot

        if (targetUserRolePosition >= requestUserRolePosition)
        {
            await interaction.editReply("You can't not ban a person with the same or higher role");
            return;
        }

        if (targetUserRolePosition >= botRolePosition)
        {
            await interaction.editReply("I can't not ban this person because they have the same or higher role than me");
            return;
        }

        //Ban user
        try {
            await targetUser.ban({ reason });
            await interaction.editReply(`User ${targetUser} was banned\nReason: ${reason}`);
            return;
        } catch (error) {
            console.log(`There was an error when banning: ${error}`);
        }
    },

    // callback: async (client, interaction) => {
    // },

    // name: 'ban',
    // description: 'Bans a Knight from the their adventure!',
    // // devOnly: boolean,
    // // testOnly: Boolean,
    // options: [
    //     {
    //         name: 'target-user',
    //         description: 'The user to ban.',
    //         required: true,
    //         type: ApplicationCommandOptionType.Mentionable
    //     },
    //     {
    //         name: 'reason',
    //         description: 'The reason to ban.',
    //         type: ApplicationCommandOptionType.String
    //     }
    // ],

    // permissionsRequired: [PermissionFlagsBits.BanMembers],
    // botPermissions: [PermissionFlagsBits.BanMembers]
}