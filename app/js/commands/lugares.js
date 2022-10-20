import { __decorate } from "tslib";
import { Connector } from '../db.js';
import { Discord, Slash } from "discordx";
const database = new Connector();
let List = class List {
    list(interaction) {
        database.getLocations()
            .then((lugares) => {
            let respostaFormatada = ">>> ";
            let objLugares = JSON.parse(lugares);
            objLugares.forEach((lugar) => {
                respostaFormatada += `${lugar.id}. **${lugar.name}** - **X**: ${lugar.x} **Y**: ${lugar.y} **Z**: ${lugar.z}.\n`;
            });
            interaction.reply(respostaFormatada);
        });
    }
};
__decorate([
    Slash({ description: "Se liga nos lugares que já descobrimos!", name: "lugares" })
], List.prototype, "list", null);
List = __decorate([
    Discord()
], List);
//# sourceMappingURL=lugares.js.map