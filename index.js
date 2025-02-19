const { Client, GatewayIntentBits, Interaction, Collection, ActivityType } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
const config = require("./config.json") // Specifies the config file
const fs = require("fs");

const { CharacterAI } = require('node_characterai');
const characterAI = new CharacterAI();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js')

// Stuff for slash commands.
client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

// Creates an array with all Slashcommands to use in the register function
for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());

    console.log(`${command.data.name}.js has loaded.`);

}

// When the bot is "ready":
client.once("ready", async () => {
    console.log(`${client.user.username} is online.`); // Log it in the console.
    client.user.setPresence({ activities: [{ name: `Character.ai bot made by @jaimytuin`, type: ActivityType.Playing }], status: 'online' }) // Set a activity.

    // Registering the slash commands to Discord.
    // const rest = new REST({ version: '10' }).setToken(config.token);
    // (async () => {
    //     try {
    //         console.log(`Started refreshing application (/) commands.`)

    //         const data = await rest.put(
    //             Routes.applicationCommands(client.user.id),
    //             { body: commands },
    //         )

    //         console.log(`Successfully reloaded application (/) commands.`)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // })();

    characterAI.authenticate(config.authToken) // Initial authentication on startup
    console.log("Logged in");
});

client.on("messageCreate", async message => {

    // If the code retrieves a message from a bot user, it stops te code.
    if (message.author.bot) return;

    // Makes it so the bot only runs when the conversation happens in a set discord channel.
    if (message.channel.id !== config.chatID) return // Change this in botConfig.json OR remove this line if you want it to function in all chats.

    // Stop the code if the bot isn't mentioned (@ or ping reply) -- If you want to make the bot reply on all messages, remove the 2 lines below.
    if (!message.mentions.users.first()) return
    if (message.mentions.users.first().id !== client.user.id) return

    // Specifify the message sent to the character.ai chat.
    var msgText = message.content.split(" ").slice(1).join(" ");

    // Displays the "YourBotsName is typing.." text in the discord channel.
    message.channel.sendTyping();

    // If no token its not auth'd
    if (!characterAI?.token) await characterAI.authenticate(config.authToken); // Authenticate again if the auth has timed out
    const character = await characterAI.fetchCharacter(config.characterID); // Get character by charID

    // Add the function to switch characters, maybe with a Client Variable that includes the current charID

    // Call https://github.com/realcoloride/node_characterai/tree/2.0?tab=readme-ov-file#calling-characters
    // Add hop in call msg detection, ai will need to be trained on it

    const dm = await character.DM(); // Get the main conversation of the character
    const aiReponse = await dm.sendMessage(msgText);
    return message.reply(aiReponse.content)

    // const dms = await character.getDMs();
    // console.log(dms)
    // https://github.com/realcoloride/node_characterai/tree/2.0?tab=readme-ov-file#installation

    // async function aiMSG() {
    //     // If the connection isn't authenticated, it authenticates it with the await function.
    //     if (!characterAI.isAuthenticated()) { 
    //         await characterAI.authenticateWithToken(botConfig.authToken);
    //         // To authenticate as a guest use .authenticateAsGuest()
    //         // To authenticate as a user use .authenticateWithToken(botConfig.authToken, botConfig.idToken)
    //     }

    //     // Create or Continue in the character.ai chat (Uses the ChatID set in botConfig.json)
    //     const chat = await characterAI.createOrContinueChat(botConfig.characterID);

    //     // Send a message
    //     const response = await chat.sendAndAwaitResponse(`${msgText}`, true);

    //     // Return the retrieved response to the code.
    //     return response
    // }

    // try {

    //     let response = await aiMSG() // Get the response data by running the aiMSG() function.
    //     message.reply(`${response.text}`) // Send the character.ai bot reponse in the discord channel.

    // } catch (error) { // This runs if something goes wrong trying to send the reponse.
    //     console.log(error); // This logs it in the console.
    //     // return message.reply("There was a problem handling the command."); // This sends a msg in the discord channel.
    // }

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