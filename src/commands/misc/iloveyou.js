const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("iloveyou")
        .setDescription("A big surprise"),

    run: async ({interaction, client}) => {
        interaction.reply(`I love you too`);
    },


    // callback: (client, interaction) => {
        
    //     interaction.reply(`I love you too`);
    // },
    
    // name: 'iloveyou',
    // description: 'Pong!',
    
}