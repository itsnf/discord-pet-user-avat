import { InteractionReplyPetUser } from './../pet-user-system/interaction-pet-user.js';

export function InteractionHandler(interaction) {
    switch(interaction.commandName) {
        case 'pet-user':
            InteractionReplyPetUser(interaction)
            break
    }
}