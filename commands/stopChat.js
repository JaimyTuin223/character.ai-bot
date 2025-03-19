const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../config.json')

module.exports = {

    data: new SlashCommandBuilder() // The slashCommandBuilder feature from Discord.JS, the lines below are to set data for discord to handle (Name, Desc, options, etc.)
        .setName('stop')
        .setDescription('Stops the currently ongoing conversation.'),

    async execute(client, interaction, characterAI) {
        let chatOwner;
        if (client?.activeChat) chatOwner = activeChat.split('_')[1];

        // Check if the user has manage server permissions (admin rights)
        if ((BigInt(interaction?.member?.permissions) & BigInt(0x20)) !== BigInt(0)) {
            // Has permission
            client.activeChat = false // Stop the conversation
            return interaction.reply("Conversation has been stopped.")

        } else {
            // Doesn't have permission
            if (interaction.user.id !== chatOwner) return interaction.reply(`You can not stop a conversation not started by you.`) // Check if the user has started the conversation

            client.activeChat = false // Stop the conversation
            return interaction.reply("Conversation has been stopped.") // Return feedback to the use

        }
    }
}
