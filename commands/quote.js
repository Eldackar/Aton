const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite");

module.exports = class Quote extends Command{

  static match(message){
    return message.content.startsWith('$quote')
  }

  static action(message){

    const embed = new Discord.RichEmbed()
    .setAuthor("QUOTE ✔️", "https://i.imgur.com/lxH8qum.png")
    .setColor("#FFD708")
    .setDescription("This is the main body of text, it can hold 2048 characters.")

    let args = message.content.split('\"')
    let date = new Date()
    let jour = date.getDate()
    let mois = date.getMonth() + 1
    let annee = date.getFullYear()
    let fullDate = jour + "/" + mois + "/" + annee
    sql.run("INSERT INTO quote (date, guildId, content, auteur) VALUES (?, ?, ?, ?)", [fullDate, message.guild.id, args[1], args[3]])

    embed.setDescription("Merci pour ta quote !")
    return message.reply({embed})
  }
}
