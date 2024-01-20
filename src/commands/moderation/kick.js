const {ApplicationCommandOptionType, PermissionFlagsBits, Client, Interaction} = require('discord.js');

module.exports = {

    callback: async (client, interaction) => {
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
            await interaction.editReply("You can't not kick a person with the same or higher role");
            return;
        }

        if (targetUserRolePosition >= botRolePosition)
        {
            await interaction.editReply("I can't not kick this person because they have the same or higher role than me");
            return;
        }

        //Ban user
        try {
            await targetUser.kick(reason);
            await interaction.editReply(`User ${targetUser} was kicked\nReason: ${reason}`);
            return;
        } catch (error) {
            console.log(`There was an error when kicking: ${error}`);
        }

    },

    name: 'kick',
    description: 'Kick a Knight from the their adventure!',
    // devOnly: boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user to kick.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable
        },
        {
            name: 'reason',
            description: 'The reason to kick.',
            type: ApplicationCommandOptionType.String
        }
    ],

    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermission: [PermissionFlagsBits.KickMembers]
}