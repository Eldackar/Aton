const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite")

module.exports = class RandomQuote extends Command{

  static match(message){
    return message.content.startsWith('$randomquote')
  }

  static action(message){

    const embed = new Discord.RichEmbed()
    .setAuthor("QUOTE ✔️", "https://i.imgur.com/lxH8qum.png")
    .setColor("#FFD708")
    .setDescription("This is the main body of text, it can hold 2048 characters.")

    let descTab = ['Quelle quote de porc !', 'Il a la quote !', 'Et une quote ! Une !', 'Quote quote quodec', 'Ta mère la quote', 'Quote moi ça !']
    sql.all(`SELECT * FROM quote WHERE guildId=${message.guild.id}`).then(rows => {
      let random = getRandomInt(1, rows.length)
      let randomQuote = getRandomInt(0, descTab.length - 1)
      console.log(random)
      let count = 0;
        rows.forEach(function (row){
          count = count + 1
          if(count == random){
            embed.setDescription(descTab[randomQuote])
            embed.addField("\""+ row.content +"\"", row.auteur + " - " + row.date)
            return message.reply({embed})
          }
        })
    })
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
