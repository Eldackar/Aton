const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite")

module.exports = class Leaderboard extends Command{

  static match(message){
    return message.content.startsWith('$updateuser')
  }

  static action(message){

    const embed = new Discord.RichEmbed()
      .setAuthor("PROFILE ✔️","https://i.imgur.com/lxH8qum.png")
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor("#FFD708")
      .setDescription("This is the main body of text, it can hold 2048 characters.")

    sql.run(`UPDATE username SET username = "${message.author.username}" WHERE userId ="${message.author.id}"`)
    embed.setDescription("Pseudo mis à jour !")
    return message.reply({embed})
  }
}
