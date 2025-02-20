const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../config.json')

module.exports = {

    data: new SlashCommandBuilder() // The slashCommandBuilder feature from Discord.JS, the lines below are to set data for discord to handle (Name, Desc, options, etc.)
        .setName('stop')
        .setDescription('Stops the currently ongoing conversation.'),

    async execute(client, interaction, characterAI) {
        const chatOwner = client.activeChat.split('_')[1]
        if (interaction.user.id !== chatOwner) return interaction.reply(`You can not stop a conversation not started by you.`)

        client.activeChat = false

        return interaction.reply("Conversation has been stopped.") // Return feedback to the use
    }
}