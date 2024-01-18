module.exports = {
    name: 'ping',
    description: 'Pong!',
    // devOnly: boolean,
    // testOnly: Boolean,
    // options: Object[],
    callback: (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`);
    }
}