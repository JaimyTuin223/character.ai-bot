
# Project Title

A brief description of what this project does and who it's for


# Character.ai discord bot

This bot allows you to communicate with your character.ai bots inside a discord chat, making use of [node_characterai](https://github.com/realcoloride/node_characterai).




## Features

- Easily chatting with a custom character.ai bot.
- Easy setup!
- Support via discord server.


## Getting the required data
Before the installation we need to get some tokens and IDs for the bot to function.

#### Discord bot token.
Head over to the [Discord developer portal](https://discord.com/developers/applications) and select an application or create one. Go to the Bot tab and select create bot. After doing this discord will show you the token to your bot.

⚠ This token gives access to your bot. DO NOT give it to others or post it online.

#### Character.ai chatID.
This ID will be used to connect to your character AI chat bot. 

Go to the Character.AI website, create or open a bot chat and copy the id found at the end of the URL. (https://beta.character.ai/chat?char= **chatID**)

#### Character.ai auth token.
This auth token is how you use your account via the code. This token can be found by going to ...

## Installation

Below are the steps explained to set up all required stuff for the bot to run.

#### 1. Packages
First we install all packages by running the command below in the command line.
```bash
  npm i -y
```

#### 2. botConfig.json
Below is everything that needs to be set in the `botConfig.json` file. This uses the data we collected at "Getting the required data".
```bash
{
    "token": "botToken",
    "characterID": "ChatID",
    "authToken": "userAccToken",
    "chatID": "discordChannelID"
}
```
## Deployment

To deploy this project run:

```bash
  npm start
```


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here) 



## Support

For support join the [Ginger Production discord server](https://discord.gg/8KxqWAKCPe). 

