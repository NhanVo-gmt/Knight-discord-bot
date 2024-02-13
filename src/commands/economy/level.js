const { ApplicationCommandOptionType, Client, Interaction, AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const Level = require('../../models/Level');
const canvacord = require('canvacord');
const calculateLevelXp = require('../../utils/calculateLevelXp');


module.exports = {

    data: new SlashCommandBuilder()
        .setName("level")
        .setDescription("Check user level")
        .addMentionableOption(option => 
            option.setName('target-user')
                .setDescription('The user \'level you want to see')
                .setRequired(true)),

    run: async ({interaction, client}) => {
        if (!interaction.inGuild()) 
        {
            interaction.reply("You can only run this command inside a server.");
            return;
        }


        await interaction.deferReply();

        const mentionUserId = interaction.options.get('target-user')?.value;
        const targetUserId = mentionUserId || interaction.member.id;
        const targetUserObj = await interaction.guild.members.fetch(targetUserId);

        const fetchedLevel = await Level.findOne(
            {
                userId: targetUserId,
                guildId: interaction.guild.id,
            }
        );

        if (!fetchedLevel)
        {
            interaction.editReply(
                mentionUserId ? `${targetUserObj.user.tag} doesn't have any levels yet. Try to chat a little more.` 
                            : `You don't have any level yet. Try to chat a little more.`
            );
            return;
        }
        console.log(fetchedLevel);

        let allLevels = await Level.find({guildId: interaction.guild.id}).select('-_id userId level xp');

        allLevels.sort((a,b) => {
            if (a.level === b.level)
            {
                return b.xp - a.xp;
            }
            else return b.level - a.level;
        });
        
        let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;

        const rank = new canvacord.Rank()
            .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
            .setRank(currentRank)
            .setLevel(fetchedLevel.level)
            .setCurrentXP(fetchedLevel.xp)
            .setRequiredXP(calculateLevelXp(fetchedLevel.level))
            .setStatus(targetUserObj.presence.status)
            .setProgressBar('#FFC300', 'COLOR')
            .setUsername(targetUserObj.user.username)
            .setDiscriminator(targetUserObj.user.discriminator);

        const data = await rank.build();

        const attachment = new AttachmentBuilder(data);

        interaction.editReply({ files: [attachment] });
    },

    // /**
    //  * 
    //  * @param {Client} client 
    //  * @param {Interaction} interaction 
    //  */
    // callback: async (client, interaction) => {
        
    // },

    // name: 'level',
    // description: 'Show your or someone levels',
    // options: [
    //     {
    //         name: 'target-user',
    //         description: 'The user whose level you want to see',
    //         type: ApplicationCommandOptionType.Mentionable
    //     }
    // ]
}