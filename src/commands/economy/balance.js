const {Client, Interaction, ApplicationCommandOptionType} = require('discord.js');
const User = require('../../models/User');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild())
        {
            interaction.reply({
                content: "You can only run this command inside a server.",
                ephemeral: true,
            });
            return;
        }
        await interaction.deferReply();

        try {
            const mentionUserId = interaction.options.get('target-user')?.value;
            const targetUserId = mentionUserId || interaction.user.id;
            const targetUserObj = await interaction.guild.members.fetch(targetUserId);

            let query = {
                userId: targetUserId,
                guildId: interaction.guild.id
            }
    
            let user = await User.findOne(query);
            if (!user)
            {
                interaction.editReply(`${targetUserObj.user.username} does not have any balance`);
                return;
            }
            
            interaction.editReply(`${targetUserObj.user.username} has ${user.balance}`);
        } catch (error) {
            console.log(`There is something wrong with check balance`);
        }

    
    },
    name: 'balance',
    description: 'Check balance',
    options: [
        {
            name: 'target-user',
            description: 'The user \'balance you want to see',
            type: ApplicationCommandOptionType.Mentionable,
        }
    ]
}