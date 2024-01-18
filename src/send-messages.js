require('dotenv').config();
const {Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const roles = [
    {
        id: '1197195283298267207',
        label: 'Knight',
    },
    {
        id: '1197197115315724389',
        label: 'Backer',
    },
]

client.on('ready', async (c) => {
    try {
        console.log('Send welcome messages');

        const channel = await client.channels.cache.get('1197104381259153448');
        if (!channel) return;

        const row = new ActionRowBuilder();
        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({
            content: 'Set a role for your adventure',
            components: [row],
        })
        process.exit();


    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);