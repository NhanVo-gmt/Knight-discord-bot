module.exports = {
    name: 'iloveyou',
    description: 'Pong!',
    // devOnly: boolean,
    // testOnly: Boolean,
    // options: Object[],
    callback: (client, interaction) => {
        
        interaction.reply(`I love you too`);
    }
}