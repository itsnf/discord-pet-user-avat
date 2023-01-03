import { SlashCommandBuilder, Routes } from "discord.js"
import { REST } from "@discordjs/rest"
import config from "../../config.json" assert {type: "json"}

const Commands = [
    new SlashCommandBuilder()
        .setName('pet-user')
        .setDescription('Pet user avatar')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('The user you want to pet')
            .setRequired(true)
        ),
]
.map(command => command.toJSON())

const rest = new REST({ version: '10' }).setToken(config.token)

rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: Commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error)