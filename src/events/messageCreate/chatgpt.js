require('dotenv').config();
const { Client, Message } = require("discord.js");
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.API_KEY
});
const openai = new OpenAIApi(configuration);

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (message, client, handler)  => {
    if (!message.inGuild() || message.author.bot) return;
    if (message.content.startsWith("!")) return;
    if (message.channel.id != process.env.CHATGPT_CHANNEL_ID) return;

    let conversationLog = [
        {
            role: 'system',
            content: 'You are a friendly helper.'
        }
    ];
    conversationLog.push({
        role: 'user',
        content: message.content,
    });

    await message.channel.sendTyping();
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
    });

    message.reply(response.data.choices[0].message);
};