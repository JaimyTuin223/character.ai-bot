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
            
            await character.createDM(false) // Creates a new dm, without the AI replying

            return interaction.reply("Messages have been saved and a new DM has been opened.")
        } catch (error) { // If something goes wrong:
            console.log(error)
            return interaction.reply("Something went wrong, chat has not been cleared.") // Return feedback to the user
        }
    }
}