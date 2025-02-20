const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder() // The slashCommandBuilder feature from Discord.JS, the lines below are to set data for discord to handle (Name, Desc, options, etc.)
        .setName('call')
        .setDescription('Call the AI character and make it join your current VC. (W.I.P)'),

    async execute(client, interaction, characterAI) {
        let member = interaction.member
        console.log(member.voice?.channel?.id)

        // const chatOwner = client.activeChat.split('_')[1]
        // if (interaction.user.id !== chatOwner) return interaction.reply(`You can not stop a conversation not started by you.`)

        // client.activeChat = false

        return interaction.reply("Joined") // Return feedback to the use
    }
}