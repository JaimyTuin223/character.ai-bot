# Character.ai discord bot

This bot allows you to communicate with your character.ai bots inside a discord chat, making use of [node_characterai](https://github.com/realcoloride/node_characterai).

> [!Note]
> This branch is in development and is very likely to have issues in the code at this point in development.

## V2 Progress
- [x] Switch to new node_characterai version
- [x] Basic functionality (Chatting)
- [x] Improved chat initiation
- [ ] More slashCommands
- [ ] Remake README.md
- [ ] Calling

## Code setup
### Node modules
Installing the correct packages can be done with the following npm command:

```bash
  npm i
```
##### To be able to run this code locally your device will need to have Node.JS installed, which can be found [here](https://nodejs.org/en/download)

### Bot token
Make sure to create a new file named `config.json` in the main file path of your project! Here you can store your bot token for the code to use.
```json
  {
    "token": "Bot token here"
  }
```
The `.gitignore` file can be removed from your project folder.

### Character.ai Access token
This acccess token will be used to authenticate the requests used by the code.

1. Go to https://character.ai/ in your browser.
2. Open the developer tools. (`F12`, `Ctrl+Shift+I`, or `Cmd+J`)
3. Go to the `Application` tab.
4. Go to `Storage` and select `Local storage`.
5. Find the `HTTP_AUTHORIZATION` key and copy the token value.
- Image example coming soon

### Character & Chat ID
Coming soon
    
## Deployment

To run the code and make your Discord bot available run the following command in an intergrated terminal.

```bash
  node index.js
```

## Support

For support join the [Ginger Productions Discord server](https://discord.gg/8KxqWAKCPe). 