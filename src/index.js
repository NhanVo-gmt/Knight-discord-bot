require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActivityType} = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');
const { CommandHandler } = require('djs-commander');
const path = require('path');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

new CommandHandler({
    client, 
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    testServer: process.env.GUILD_ID
});

(async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connect to DB`);

    } catch (error) {
        console.log(`Error ${error}`);
    }
})();


client.login(process.env.TOKEN);