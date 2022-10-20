import { IntentsBitField } from 'discord.js';
import { Client } from 'discordx';
import { dirname, importx } from "@discordx/importer";

async function start() {
    await importx(
        dirname(import.meta.url) + "/{events,commands,api}/**/*.{ts,js}"
      );
    const client = new Client({
        botId:"Teste",
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
        ],
        botGuilds: ['498584006498058240'],
    });

    client.once("ready",async () => {
        // Descomentar para restar os comandos disponíveis ao estado atual.
        //await client.clearApplicationCommands('498584006498058240');
        await client.initApplicationCommands();
        console.log("Ready.");
        
    });

    client.on("interactionCreate", (interaction) => {
        client.executeInteraction(interaction);
    });
    
    if(process.env.DISCORD_TOKEN != null){
        await client.login(process.env.DISCORD_TOKEN);
    }   
}

start();