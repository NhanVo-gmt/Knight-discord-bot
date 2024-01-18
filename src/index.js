const {Client, IntentsBitField, EmbedBuilder, ActivityType} = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
require('dotenv').config();
//import {commands} from './register-command';

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

eventHandler(client);

// let status = [
//     {
//         name: 'On my way',
//         type: ActivityType.Streaming,
//         url: 'https://www.youtube.com/channel/UCVQeY8PlTlOp_Uwr0t8a82w',
//     },
//     {
//         name: 'the night',
//         type: ActivityType.Watching,
//     },
//     {
//         name: 'to the sound',
//         type: ActivityType.Listening,
//     }
// ]

// client.on('ready', (c) => {
//     console.log(`${c.user.tag} is online`);

//     setInterval(() => {
//         let random = Math.floor(Math.random() * status.length);
//         client.user.setActivity(status[random]);
//     }, 10000);
// })

// client.on('interactionCreate', async (command) => {

//     try {

//         if (command.isChatInputCommand()) 
//         {
//             if (command.commandName === 'info') {
//                 command.reply('This is the game about the Knight saving the world!');
//             }
//             // Sending an adding
//             else if (command.commandName === 'add')
//             {
//                 const num1 = command.options.get('first-num')?.value;
//                 const num2 = command.options.get('second-num')?.value;
//                 command.reply(`The sum is ${num1 + num2}`);
//             }
//             // Sending an embed
//             else if (command.commandName === 'embed')
//             {
//                 const embed = new EmbedBuilder()
//                             .setTitle('Embed Title')
//                             .setDescription('This is an embed description')
//                             .setColor('Yellow')
//                             .addFields({name: 'Field Title', value: 'Field Value', inline: true})
//                             .addFields({name: 'Field Title', value: 'Field Value', inline: true})
                
//                 command.reply({embeds: [embed]});
//             }
//         }
    
//         if (command.isButton())
//         {
//             await command.deferReply({ephemeral: true})
    
//             const role = command.guild.roles.cache.get(command.customId);
//             if (!role) {
//                 command.editReply({
//                     content: 'I could not find that role',
//                 })
//                 return;
//             }
    
//             const hasRole = command.member.roles.cache.has(role.id);
//             if (hasRole)
//             {
//                 await command.member.roles.remove(role);
//                 await command.editReply(`The role ${role} has been removed.`);
//                 return;
//             }
    
//             await command.member.roles.add(role);
//             await command.editReply(`The role ${role} has been added.`);
//         }
//     } catch (error) {
//         console.log(error);
//     }

// })

// client.on('messageCreate', (message) => {
//     if (message.author.bot)
//     {
//         return;
//     }

//     if (message.content == 'Hello')
//     {
//         message.reply("Hey!")
//     }
// })

client.login(process.env.TOKEN);