const {devs, testServer} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        )

        if (!commandObject) return;

        // Only for developers
        if (commandObject.devOnly)
        {
            if (!devs.includes(interaction.member.id))
            {
                interaction.reply({
                    content: 'Only developers are allowed to run this command.',
                    ephemeral: true,
                });
                return;
            }
        }

        // Only use on test server
        if (commandObject.testOnly)
        {
            if (!interaction.guild.id === testServer)
            {
                interaction.reply({
                    content: 'This command can not be ran here.',
                    ephemeral: true,
                });
                return;
            }
        }

        // Only when having enough permission
        if (commandObject.botPermissions?.length) 
        {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;
                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                    content: "I don't have enough permissions.",
                    ephemeral: true,
                    });
                    return;
                }
            }
        }

        await commandObject.callback(client, interaction);
    } 
    catch (error) {
        
    }
}