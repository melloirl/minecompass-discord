import { __decorate, __param } from "tslib";
import { ApplicationCommandOptionType } from 'discord.js';
import { Discord, Slash, SlashOption } from "discordx";
import { Connector } from '../db.js';
const database = new Connector();
let Adder = class Adder {
    add(nome, x, y, z, interaction) {
        database.addLocation(nome, parseInt(x), parseInt(y), parseInt(z))
            .then(() => {
            interaction.reply(`${nome} adicionada ao mapa nas coordenadas X: ${x}, Y: ${y}, Z: ${z}.`);
        })
            .catch(() => {
            interaction.reply("Falha ao adicionar ao banco de dados.");
        });
    }
};
__decorate([
    Slash({ description: "Adicione novas coordenadas ao nosso mapa! 🗺️🌎", name: "adicionar" }),
    __param(0, SlashOption({
        description: "Como quer batizar esse lugar?",
        name: "nome",
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __param(1, SlashOption({
        description: "Coordenada X",
        name: "x",
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __param(2, SlashOption({
        description: "Coordenada Y",
        name: "y",
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __param(3, SlashOption({
        description: "Coordenada Z",
        name: "z",
        required: true,
        type: ApplicationCommandOptionType.String,
    }))
], Adder.prototype, "add", null);
Adder = __decorate([
    Discord()
], Adder);
//# sourceMappingURL=listen.js.map