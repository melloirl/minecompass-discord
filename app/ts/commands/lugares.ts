import { Connector } from '../db.js';
import { CommandInteraction, ApplicationCommandOptionType} from 'discord.js';
import { Discord, Slash, SlashOption} from "discordx";

const database = new Connector()

@Discord()
class List {
  @Slash({ description: "Se liga nos lugares que já descobrimos!", name: "lugares" })
  list(
    interaction: CommandInteraction) {
    database.getLocations()
    .then((lugares)=>{
      let respostaFormatada = ">>> "
      let objLugares = JSON.parse(lugares);
      objLugares.forEach((lugar:any) => {
        respostaFormatada += `${lugar.id}. **${lugar.name}** - **X**: ${lugar.x} **Y**: ${lugar.y} **Z**: ${lugar.z}.\n`;
      });
      interaction.reply(respostaFormatada);
    })
  }
}