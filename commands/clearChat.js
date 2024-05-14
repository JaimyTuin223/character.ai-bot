const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const botConfig = require('../botConfig.json')
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

module.exports = {

    data: new SlashCommandBuilder() // The slashCommandBuilder feature from Discord.JS, the lines below are to set data for discord to handle (Name, Desc, options, etc.)
        .setName('clearchat')
        .setDescription('Saves and starts a new chat with your character.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels), // User needs the manage channels permission to be able to use this command

    async execute(client, interaction) {
 
        try {

            if (!characterAI.isAuthenticated()) { // Check if connection is up and authenticated
                await characterAI.authenticateWithToken(botConfig.authToken); // If the connection isn't up, the start the connection and authenticate it
            }

            // Get the chat from the character
            const chat = await characterAI.createOrContinueChat(botConfig.characterID);
            chat.saveAndStartNewChat() // Start a new chat.

            return interaction.reply("AI chat has been cleared!") // Return feedback to the user

        } catch (error) { // If something goes wrong:
            return interaction.reply("Something went wrong, chat has not been cleared.") // Return feedback to the user
        }
    }
}