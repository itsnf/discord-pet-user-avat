import { Client, GatewayIntentBits } from "discord.js"
import config from "../config.json" assert { type: 'json' }

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

client.once('ready', () => {
    console.log('Ready!')
})

client.login(config.token)