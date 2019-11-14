const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite");

module.exports = class Flip extends Command{

  static match(message){
    return message.content.startsWith('$flip');
  }

  static action(message){
    let args = message.content.split(' ');
    let value = getRandomInt(0,1);
    //addStat(value);
    args[2] = Math.floor(args[2]);
    const embed = new Discord.RichEmbed()

    .setAuthor("FLIP ✔️","https://i.imgur.com/lxH8qum.png")
    /*
    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
    */
    .setColor("#FFD708")
    .setDescription("This is the main body of text, it can hold 2048 characters.")


    if(args[2] <= 0 || args.length != 3 || isNaN(args[2]) || args[1] != 'p' && args[1] != 'f'){
      embed.setDescription("Les arguments ne sont pas valides !")
      embed.setAuthor("FLIP ❌", "https://i.imgur.com/lxH8qum.png")
      return message.reply({embed});
    }else{
      sql.get(`SELECT * FROM money WHERE userId ="${message.author.id}"`).then(row => {
        if(!row || row.money < args[2]){
          embed.setDescription("Vous n'avez pas assez d'Ankh, revenez plus tard !")
          return message.reply({embed});
        } else{
          if(value == 1){
            sql.run(`UPDATE money SET money = ${row.money + (args[2])} WHERE userId = ${message.author.id}`)
            /*sql.get(`SELECT * FROM stats`).then(row => {
              sql.run(`UPDATE money SET money = ${row.money + (args[2])} WHERE userId = ${message.author.id}`)
            })*/
            embed.setDescription(`Vous avez gagné \`\`${args[2]}\`\` Ankh ! Vous avez \`\`${(args[2]) + row.money}\`\` Ankh au total. `)
            message.reply({embed});
          } else{
            /*sql.run(`UPDATE money SET money = ${row.money + (args[2])} WHERE userId = ${message.author.id}`)
            embed.setDescription(`Vous avez gagné \`\`${args[2]}\`\` Ankh ! Vous avez \`\`${(args[2]) + row.money}\`\` Ankh au total. `)
            message.reply({embed});*/
            sql.run(`UPDATE money SET money = ${row.money - args[2]} WHERE userId = ${message.author.id}`)
            embed.setAuthor("FLIP ❌", "https://i.imgur.com/lxH8qum.png")
            embed.setDescription(`Vous avez perdu \`\`${args[2]}\`\` Ankh ! Vous avez \`\`${row.money - args[2]}\`\` Ankh au total. `)
            message.reply({embed});
          }
        }
      }).catch(() => {
        console.error;
      });
    }
  }


}

/*function addStat(resultat){
  sql.get(`SELECT * FROM stats`).then(row => {
    if(resultat == 1){
      sql.run(`UPDATE stats SET face = ${row.face + 1}`)
    }else{
      sql.run(`UPDATE stats SET pile = ${row.pile + 1} WHERE `)
    }
  })
}*/

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
