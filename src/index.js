import { Client, GatewayIntentBits } from "discord.js"
import { InteractionHandler } from './handlers/interaction-handler.js';
import config from "../config.json" assert { type: 'json' }

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

client.once('ready', () => {
    console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
	if (interaction.isChatInputCommand()) {
		InteractionHandler(interaction)
	}
})

client.login(config.token)