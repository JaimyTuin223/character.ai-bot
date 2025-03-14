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

### Character & chat token
Coming soon
    
## Deployment

To run the code and make your Discord bot available run the following command in an intergrated terminal.

```bash
  node index.js
```

## Support

For support join the [Ginger Productions Discord server](https://discord.gg/8KxqWAKCPe). 