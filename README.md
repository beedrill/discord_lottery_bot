# Lottery Bot
## To deploy:
Install [NodeJS](https://nodejs.org/).

Install Dependency:
```bash
npm i
```
create a `config.json` file in the root folder with your bot token and clientId(application id):
```json
{
	"token": "********************************************************",
    "clientId": "******************",
    "channelId": "******************"
}

```
Then run
```bash
node index.js
```
to start the bot.

## configuration
Configurations are in the folder `configs`, you can customize the probability distribution and result formats here.

Make sure the 'name' attribute is unique, that is the command name discord used to route command. Make sure the 'weight' in the probability distribution sum up to 100, otherwise, the distribution might not be working properly.
