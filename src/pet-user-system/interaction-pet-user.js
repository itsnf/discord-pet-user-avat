import { PetImage } from "./pet-image.js"

export async function InteractionReplyPetUser(interaction) {
    await interaction.deferReply()

    const PettingUser = interaction.options.getUser('user');

    interaction.editReply({
        files: [
            {
                attachment: await PetImage(PettingUser.displayAvatarURL({ extension: 'png' })),
                name: `${PettingUser.username}#${PettingUser.discriminator}-pet-pet.gif`
            }
        ]
    })
}