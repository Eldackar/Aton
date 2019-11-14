const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite")

module.exports = class Leaderboard extends Command{

  static match(message){
    return message.content.startsWith('$leaderboard')
  }

  static action(message){
    const embed = new Discord.RichEmbed()
    .setAuthor("LEADERBOARD ✔️", "https://i.imgur.com/lxH8qum.png")
    .setColor("#FFD708")
    .setDescription("This is the main body of text, it can hold 2048 characters.")

    console.log("ICI")
    let args = message.content.split(' ')

    if(args[1] == "levels"){
      let count = 0
      embed.setDescription("Tableau des scores LEVELS")
      sql.all(`SELECT * FROM scores INNER JOIN username ON scores.userId=username.userId ORDER BY points DESC`).then(rows => {
        rows.forEach(function (row) {
          count = count + 1
          if(count < 26){
            embed.addField("#" + count + " " + row.username,  "Level =>" + row.level + " | " + "Point =>" + row.points)
          }
        })
        return message.reply({embed})
      })
    } else if(args[1] == "ankh"){
      let count = 0
        embed.setDescription("Tableau des scores ANKH")
        sql.all(`SELECT * FROM money INNER JOIN username ON money.userId=username.userId ORDER BY money DESC`).then(rows => {
          rows.forEach(function (row) {
            count = count + 1
            if(count < 26){
              embed.addField("#" + count + " " + row.username, "Money =>" + row.money + " | " + "Streak =>" + row.streak)
            }
          })
          return message.reply({embed})
        })
    } else if(args[1] == "rep"){
      let count = 0
      embed.setDescription("Tableau des scores REP")
      sql.all(`SELECT * FROM reputation INNER JOIN username ON reputation.userId=username.userId ORDER BY reputation DESC`).then(rows => {
        rows.forEach(function (row) {
          count = count + 1
          if(count < 26){
            embed.addField("#" + count + " " + row.username,  "Rep =>" + row.reputation)
          }
        })
        return message.reply({embed})
      })
    } else if(args[1] == "stats"){
      sql.get(`SELECT * FROM stats`).then(row => {
        embed.setDescription(`STATS du jeu Flip !`)
        embed.addField("PILE", "=> " + row.pile, true)
        embed.addField("FACE", "=> " + row.face, true)
        return message.reply({embed})
      })
    } else{
        embed.setAuthor("LEADERBOARD ❌", "https://i.imgur.com/lxH8qum.png")
        embed.setColor("FF0000")
        embed.setDescription("BEN ALORS TU SAIS PAS TAPER UNE COMMANDE")
        return message.reply({embed})
    }
  }
}
