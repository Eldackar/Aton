const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite");

module.exports = class Ankh extends Command{

    static match(message){
      return message.content.startsWith('$ankh');
    }

    static action(message){

      const embed = new Discord.RichEmbed()
        .setAuthor("ANKH 🔸","https://i.imgur.com/lxH8qum.png")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor("#FFD708")
        .setDescription("This is the main body of text, it can hold 2048 characters.")

      sql.get(`SELECT * FROM money WHERE userId ="${message.author.id}"`).then(row => {
        if(!row){
          embed.setColor("#FF0000");
          embed.setDescription("Vous avez \`\`0\`\` Ankh, plus pauvre que toi ça existe pas <:Risitas2:280120484572692480>");
          return message.reply({embed});
        } else{
          embed.setDescription(`Vous avez \`\`${row.money}\`\` Ankh`)
          return message.reply({embed});
        }
      }).catch(() => {
        console.error;
      });
    }
}
