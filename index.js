const { Client, GatewayIntentBits, Interaction, Collection, ActivityType } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
const botConfig = require("./botConfig.json") // Specifies the config file
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();
const fs = require("fs");  

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js')

// Stuff for slash commands.
client.commands = new Collection(); 
const commands = []; 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

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

    let refresh = false // Set this to true when you want to refresh slash commands (e.g. after adding one or changing it's name / perms)

    const rest = new REST({ version: '10' }).setToken(botConfig.token);
    if (refresh == true) {
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
    }
});

client.on("messageCreate", async message => {

    // If the code retrieves a message from a bot user, it stops te code.
    if (message.author.bot) return; 

    // Makes it so the bot only runs when the conversation happens in a set discord channel.
    if (!message.channel.id == botConfig.chatID) return // Change this in botConfig.json OR remove this line if you want it to function in all chats.

    // Stop the code if the bot isn't mentioned (@ or ping reply) -- If you want to make the bot reply on all messages, remove the 2 lines below.
    if (!message.mentions.users.first()) return
    if (message.mentions.users.first().id !== client.user.id) return 

    // Specifify the message sent to the character.ai chat.
    var msgText = message.content.split(" ").slice(0).join(" ");

    // Displays the "YourBotsName is typing.." text in the discord channel.
    message.channel.sendTyping();

    async function aiMSG() {
        // If the connection isn't authenticated, it authenticates it with the await function.
        if (!characterAI.isAuthenticated()) { 
            await characterAI.authenticateWithToken(botConfig.authToken);
            // To authenticate as a guest use .authenticateAsGuest()
            // To authenticate as a user use .authenticateWithToken(botConfig.authToken, botConfig.idToken)
        }

        // Create or Continue in the character.ai chat (Uses the ChatID set in botConfig.json)
        const chat = await characterAI.createOrContinueChat(botConfig.characterID);

        // Send a message
        const response = await chat.sendAndAwaitResponse(`${msgText}`, true);

        // Return the retrieved response to the code.
        return response
    }

    try {

        let response = await aiMSG() // Get the response data by running the aiMSG() function.
        message.reply(`${response.text}`) // Send the character.ai bot reponse in the discord channel.

    } catch (error) { // This runs if something goes wrong trying to send the reponse.
        console.log(error); // This logs it in the console.
        // return message.reply("There was a problem handling the command."); // This sends a msg in the discord channel.
    }

});

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

client.login(botConfig.token) // connects the bot.