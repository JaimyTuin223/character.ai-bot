const { Client, GatewayIntentBits, Interaction, Collection, ActivityType } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
const config = require("./config.json") // Specifies the config file
const fs = require("fs");

const { CharacterAI } = require('node_characterai');
const characterAI = new CharacterAI();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js')

// Global Vars
client.activeChat = false;
client.activeCharacter = '7fHWfxbf3zDzh2N_Z0fY9uXgpx24CyhN1rLAiV2pBlc'; // default character chat ID
// --

// Stuff for slash commands.
client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

// Creates an array with all Slashcommands to use in the register function
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());

    console.log(`[Command] - ${command.data.name}.js has loaded.`);
}

// When the bot is "ready":
client.once("ready", async () => {
    console.log(`${client.user.username} is online.`); // Log it in the console.

    // Set activity status
    client.user.setPresence({
        activities: [{
            name: `Chatting with members!`, // The text to display
            type: ActivityType.Custom // Playing, listening, etc.
        }],
        status: 'online' // status (online, idle, etc.)
    });

    // Registering the slash commands to Discord.
    const rest = new REST({ version: '10' }).setToken(config.token);
    (async () => {
        try {
            console.log(`Started refreshing application (/) commands.`)

            const data = await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            )

            console.log(`Successfully reloaded application (/) commands.`)
        } catch (error) {
            console.error(error)
        }
    })();

    characterAI.authenticate(config.authToken) // Initial authentication on startup
    console.log("Connected to C.ai");
});

client.on("messageCreate", async message => {

    // If the code retrieves a message from a bot user, it stops te code.
    if (message.author.bot) return;

    // Add back code comments
    
    let msgText = message.content
    if (!client.activeChat) {
        if (!message.mentions.users.first()) return
        if (message.mentions.users.first().id !== client.user.id) return

        client.activeChat = `${message.channel.id}_${message.author.id}`
        msgText = message.content.split(" ").slice(1).join(" ");
    }

    if (!client.activeChat.includes(`${message.channel.id}`)) return
    // if (message.channel.id !== activeChat) return

    // Displays the "YourBotsName is typing.." text in the discord channel.
    message.channel.sendTyping();

    // If no token its not auth'd
    if (!characterAI?.token) await characterAI.authenticate(config.authToken); // Authenticate again if the auth has timed out
    const character = await characterAI.fetchCharacter(client.activeCharacter); // Get character by charID

    // Add the function to switch characters, maybe with a Client Variable that includes the current charID

    // Call https://github.com/realcoloride/node_characterai/tree/2.0?tab=readme-ov-file#calling-characters
    // Add hop in call msg detection, ai will need to be trained on it

    const dm = await character.DM(); // Get the main conversation of the character
    const aiReponse = await dm.sendMessage(msgText);
    return message.reply(aiReponse.content)
});

// Interaction command handling
client.on("interactionCreate", async interaction => {
    if (interaction.isCommand()) {
        const slashCommand = client.commands.get(interaction.commandName); // Getting the right command file to execute 
        if (!slashCommand) return; // If interaction isn't a slashCommand return

        try {
            await slashCommand.execute(client, interaction, characterAI); // Try to execute the command
        } catch (err) { // Catch if something goes wrong, and if so, return an error to the user.
            await interaction.reply({ content: `An error has occured. ${err}`, ephemeral: true });
        }
    }
})

client.login(config.token) // connects the bot.