require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'info',
        description: 'Infomation about the game knight',
    },



    // Command for adding 2 numbers
    // {
    //     name: 'add',
    //     description: "Adding two number",
    //     options: [
    //         {
    //             name: 'first-num',
    //             description: 'The first number',
    //             type: ApplicationCommandOptionType.Number,
    //             required: true,
    //             choices: [
    //                 {
    //                     name: 'one',
    //                     value: 1,
    //                 },
    //                 {
    //                     name: 'two',
    //                     value: 2,
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'second-num',
    //             description: 'The second number',
    //             type: ApplicationCommandOptionType.Number,
    //             required: true,
    //         },
    //     ],
    // },


    {
        name: 'embed',
        description: 'sending an embed',
    }
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);


(async() => {
    try {
        console.log('Registering slash command....');

        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands});

        console.log('Slash command register successfully....');
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
})();
