const { Client, GatewayIntentBits, ActivityType } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

const botConfig = require("./botConfig.json") // Specifies the config file
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

// When the bot is "ready":
client.once("ready", async () => {
    console.log(`${client.user.username} is online.`); // Log it in the console.
    client.user.setPresence({ activities: [{ name: `Character.ai.`, type: ActivityType.Playing }], status: 'online' }) // Set a activity.
});

client.on("messageCreate", async message => {

    // If the code retrieves a message from a bot user, it stops te code.
    if (message.author.bot) return;

    // Makes it so the bot only runs when the conversation happens in a set discord channel.
    if (!message.channel.id == botConfig.chatID) return // Change this in botConfig.json OR remove this line if you want it to function in all chats.

    // Stop the code if the bot isn't mentioned (@ or ping reply)
    if (!message.mentions.users.first()) return
    if (message.mentions.users.first().id !== client.user.id) return 

    // Specifify the message sent to the character.ai chat.
    var msgText = message.content.split(" ").slice(1).join(" ");
    if (!msgText) return // Prevent the code from sending an empty message to the ai.
    // Replace the 1 above with a 0 if you don't @mention the bot infront of your msgs (Reply ping / Removed the mention required)

    // Displays the "YourBotsName is typing.." text in the discord channel.
    message.channel.sendTyping();

    async function aiMSG() {

        // If the connection isn't authenticated, it authenticates it with the await function.
        if (!characterAI.isAuthenticated()) { 
            await characterAI.authenticateWithToken(botConfig.authToken);
            // To authenticate as a guest use .authenticateAsGuest()
            // To authenticate as a user use .authenticateWithToken(botConfig.authToken)
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
        await message.reply("There was a problem handling the command."); // This sends a msg in the discord channel.
    }

});

client.login(botConfig.token) // connects the bot.
