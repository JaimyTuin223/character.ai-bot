const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../config.json')

module.exports = {

    data: new SlashCommandBuilder() // The slashCommandBuilder feature from Discord.JS, the lines below are to set data for discord to handle (Name, Desc, options, etc.)
        .setName('clearchat')
        .setDescription('Saves and starts a new chat with your character.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels), // User needs the manage channels permission to be able to use this command

    async execute(client, interaction, characterAI) {
 
        try {
            if (!characterAI?.token) await characterAI.authenticate(config.authToken); // Authenticate again if the auth has timed out
            const character = await characterAI.fetchCharacter(client.activeCharacter); // Get character by charID

            console.log(character)

            return interaction.reply("Command coming soon")

            // This command will be used to close the chat and start a fresh new one with the trained data.
            // Will need to add functionality to load different chats.

        } catch (error) { // If something goes wrong:
            return interaction.reply("Something went wrong, chat has not been cleared.") // Return feedback to the user
        }
    }
}