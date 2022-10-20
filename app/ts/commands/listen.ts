import { CommandInteraction, ApplicationCommandOptionType} from 'discord.js';
import { Discord, Slash, SlashOption} from "discordx";
import { Connector } from '../db.js';


const database = new Connector()


@Discord()
class Adder {
  @Slash({ description: "Adicione novas coordenadas ao nosso mapa! 🗺️🌎", name: "adicionar" })
  add(
    @SlashOption({
      description: "Como quer batizar esse lugar?",
      name:"nome",
      required:true,
      type: ApplicationCommandOptionType.String,
    })
    nome: string,
    @SlashOption({
      description: "Coordenada X",
      name:"x",
      required:true,
      type: ApplicationCommandOptionType.String,
    })
    x: string,
    @SlashOption({
      description: "Coordenada Y",
      name:"y",
      required:true,
      type: ApplicationCommandOptionType.String,
    })
    y: string,
    @SlashOption({
      description: "Coordenada Z",
      name:"z",
      required:true,
      type: ApplicationCommandOptionType.String,
    })
    z: string,
    interaction: CommandInteraction) {
    database.addLocation(nome,parseInt(x),parseInt(y),parseInt(z))
    .then(()=>{
      interaction.reply(`${nome} adicionada ao mapa nas coordenadas X: ${x}, Y: ${y}, Z: ${z}.`);
    })
    .catch(()=>{
      interaction.reply("Falha ao adicionar ao banco de dados.");
    })
  }
}