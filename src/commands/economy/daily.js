const { Client, Interaction, SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');

const dailyAmount = 100;

module.exports = {

    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Collect your daily"),

    run: async ({interaction, client}) => {
        if (!interaction.inGuild())
        {
            interaction.reply({
                content: "You can only run this command inside a server",
                ephemeral: true
            });
            return;
        }

        try {
            await interaction.deferReply();
            const query = {
                userId: interaction.member.id,
                guildId: interaction.guild.id,
            };

            let user = await User.findOne(query);
            if (user) {
                const lastDailyDate = user.lastDaily.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyDate === currentDate)
                {
                    interaction.editReply("You have received today dailies");
                    return;
                }
            }
            else 
            {
                user = new User({
                    ...query,
                    lastDaily: new Date(),
                });
            }

            user.balance += dailyAmount;
            await user.save();

            interaction.editReply(`${dailyAmount} was added to your balance. Your new balance is ${user.balance}`)

        } catch (error) {
            console.log(`Error with daily ${error}`);
        }
    },
    
    // /**
    //  * 
    //  * @param {Client} client 
    //  * @param {Interaction} interaction 
    //  */
    // callback: async (client, interaction) => {
    //     
    // },
    // name: 'daily',
    // description: 'Collect your dailies!',
}