const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite");

module.exports = class Give extends Command{

    static match(message){
      return message.content.startsWith('$give');
    }

    static action(message){

      const embed = new Discord.RichEmbed()
    .setAuthor("GIVE ✔️", "https://i.imgur.com/lxH8qum.png")
    .setColor("#FFD708")
    .setDescription("This is the main body of text, it can hold 2048 characters.")

      let args = message.content.split(' ')
      let idMention = message.mentions.members.first().user.id;
      let usernameMention = message.mentions.members.first().user.username;
      let finalAmount = Math.floor(args[2])
      if(!isNaN(finalAmount) && idMention != message.author.id && finalAmount != 0){
        //message.reply(" Condition OK")
        sql.get(`SELECT * FROM money WHERE userId = ${message.author.id}`).then(row => {
          if(row.money < finalAmount){
            embed.setDescription("Pas assez de ankh !")
            embed.setColor("#FF0000")
            embed.setAuthor("GIVE ❌", "https://i.imgur.com/lxH8qum.png")
            return message.reply({embed})
          } else {
            sql.run(`UPDATE money SET money = ${parseInt(row.money) - parseInt(finalAmount)} WHERE userId = ${message.author.id}`)
            sql.get(`SELECT * FROM money WHERE userId = ${idMention}`).then(secondRow => {
              sql.run(`UPDATE money SET money = ${parseInt(secondRow.money) + parseInt(finalAmount)} WHERE userId = ${idMention}`)
              embed.setDescription(`Vous avez donné \`\`${finalAmount}\`\` Ankh !`)
              embed.addField(message.author.username, row.money + " => " + (parseInt(row.money) - parseInt(finalAmount)) + "(-" + finalAmount + ")", true)
              embed.addField(usernameMention, secondRow.money + " => " + (parseInt(secondRow.money) + parseInt(finalAmount)) + "(+" + finalAmount + ")", true)
              return message.reply({embed})
            })
          }
        })
      } else {
        embed.setDescription("Ben alors on sait pas taper une commande ?")
        embed.setColor("#FF0000")
        embed.setAuthor("GIVE ❌", "https://i.imgur.com/lxH8qum.png")
        return message.reply({embed})
      }

      /*if(message.author.id == "246759454480138241"){
        sql.run(`UPDATE money SET money = ${args[1]} WHERE userId = ${message.author.id}`);
        return message.reply("Bienvenue mon maitre")
      }else{
        return message.reply("Alors on se prend pour le créateur ?")
      }*/
    }
}
