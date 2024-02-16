const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Information about the game Knight"),

    run: async ({interaction, client}) => {
        interaction.reply(`This is the game Knight (still in development)`);
    },

    // name: "info",
    // description: "Information about the game Knight",
    // callback: (client, interaction) => {
    //     interaction.reply(`This is the game Knight (still in development)`);
    // },
}