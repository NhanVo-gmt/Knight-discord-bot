const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with the bot ping!"),

    run: async ({interaction, client}) => {
        await interaction.deferReply();
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;
        interaction.editReply(`Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`);
    },
    
    // name: 'ping',
    // description: 'Replies with the bot ping!',
    // // devOnly: boolean,
    // // testOnly: Boolean,
    // // options: Object[],
    // callback: async (client, interaction) => {
    //     await interaction.deferReply();
    //     const reply = await interaction.fetchReply();
    //     const ping = reply.createdTimestamp - interaction.createdTimestamp;

    //     interaction.editReply(`Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`);
    // }
}