# Character.ai discord bot

This bot allows you to communicate with your character.ai bots inside a discord chat, making use of [node_characterai](https://github.com/realcoloride/node_characterai).

> [!Note]
> This branch is in development and is very likely to have issues in the code at this point in development.
> 
> ### Future plans
> - [ ] Character switching via slash command
> - [ ] Image generation
> - [ ] Calling

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
    "token": "Discord bot token",
    "authToken": "C.ai Access token",
    "defaultCharacter": "C.ai Character ID"
}
```
The `.gitignore` file can be removed from your project folder.

### Character.ai Access token
This acccess token will be used to authenticate the requests used by the code.

1. Go to https://character.ai/ in your browser.
2. Open the developer tools. (`F12`, `Ctrl+Shift+I`, or `Cmd+J`)
3. Go to the `Application` tab.
4. Go to `Storage` and open the `cookies` dropdown.
5. Inside this dropdown list open `https://character.ai`
6. Find the `HTTP_AUTHORIZATION` entry and copy the value behind token.

![image](https://github.com/user-attachments/assets/982c18c0-13fe-45d0-8a97-f33dcc19038f)


### Character ID
This replaces the old chat ID value, but is still retrieved the same, simply navigate to your character and copy the value behind `/chat/`.
![image](https://github.com/user-attachments/assets/84e02e2e-332f-42a7-8dc6-5f0c5e8c2c78)

    
## Deployment

To run the code and make your Discord bot available run the following command in an intergrated terminal.

```bash
  node index.js
```

## Support

For support join the [Ginger Productions Discord server](https://discord.gg/8KxqWAKCPe). 
