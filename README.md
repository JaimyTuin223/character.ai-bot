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
This auth token is how you use your account via the code. (You can also use a guest account, but this will include limitations)

1. Open the [Character.AI website](https://beta.character.ai) in your browser.
2. Open the developer tools. (F12, Ctrl+Shift+I, or Cmd+J)
3. Go to the Application tab.
4. Go to the Storage section and click on Local Storage
5. Look for the @@auth0spajs@@:: .. 
6. Open the body with the arrows and copy the access token

#### Can't find the data?
If you can't find the data using the steps above, feel free to watch the installation on my youtube video. (coming soon.)

## Installation

Below are the steps explained to set up all required stuff for the bot to run.

#### 1. Packages
First we install all packages by running the command below in the command line.
```bash
  npm i -y
```

#### 2. botConfig.json
Below is everything that needs to be set in the `botConfig.json` file. This uses the data we collected at "Getting the required data".
```json
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

![App Screenshot](https://i.imgur.com/mCjH1Kw.png)



## Support

For support join the [Ginger Production discord server](https://discord.gg/8KxqWAKCPe). 

