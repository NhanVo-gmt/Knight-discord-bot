const { ApplicationCommandOptionType, PermissionsBitField, PermissionFlagsBits, Client, Interaction } = require("discord.js");
const ms = require('ms');

module.exports = {

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const mentionable = interaction.options.get('target-user').value;
        const duration = interaction.options.get('duration').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(mentionable);
        if (!targetUser)
        {
            await interaction.editReply(`User not exist`);
            return;
        }

        if (targetUser.user.bot)
        {
            await interaction.editReply(`User is a bot`);
            return;
        }

        const msDuration = ms(duration);
        if (isNaN(msDuration))
        {
            await interaction.editReply(`Please provide a valid duration`);
            return;
        }

        if (msDuration < 5000 || msDuration > 2.419e9)
        {
            await interaction.editReply(`Timeout duration can not be less than 5 seconds or more than 28 days.`);
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; // Get the highest position of the target user
        const requestUserRolePosition = interaction.member.roles.highest.position; // Get highest position of the command user
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // Get position of bot

        if (targetUserRolePosition >= requestUserRolePosition)
        {
            await interaction.editReply("You can't not timeout a person with the same or higher role");
            return;
        }

        if (targetUserRolePosition >= botRolePosition)
        {
            await interaction.editReply("I can't not timeout this person because they have the same or higher role than me");
            return;
        }

        //Timeout a user
        try {
            const { default:prettyMs } = await import('pretty-ms');

            if (targetUser.isCommunicationDisabled())
            {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`${targetUser}'s timeout has been updated to ${prettyMs(msDuration, { verbose: true })}
                    \nReason: ${reason}`);
                return;
            }

            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`${targetUser} was timed out for ${prettyMs(msDuration, { verbose: true })}
                \nReason: ${reason}`);

        } catch (error) {
            console.log(`There was an error when kicking: ${error}`);
        }
    },

    name: "timeout",
    description: "Timeout a user.",
    options: [
        {
            name: 'target-user',
            description: 'The user you want to timeout.',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'duration',
            description: 'Timeout duration (30m, 1h, 1day)',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for timeout',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],
}