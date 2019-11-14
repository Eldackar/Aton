const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open('./score.sqlite')

module.exports = class Slots extends Command{

  static match(message){
    return message.content.startsWith('$slots')
  }

  static action(message){

    let args = message.content.split(' ')
    let random = Math.random()
    let symbolArray = ["🍐", "🍒", "🍓", "🍍", "🍋", "🍊", "🍉", "🥝", "🍑", "🍌", "🍇", "🍎", "🍏"]
    let rate

    const embed = new Discord.RichEmbed()
    .setAuthor("SLOTS ✔️","https://i.imgur.com/lxH8qum.png")
    .setColor("#FFD708")
    .setDescription("This is the main body of text, it can hold 2048 characters.")

    if(args[1] <= 0 || args.length != 2 || isNaN(args[1])) {
      embed.setDescription("Les arguments ne sont pas valides !")
      embed.setAuthor("SLOTS ❌", "https://i.imgur.com/lxH8qum.png")
      return message.reply({embed});
    }else{
      args[1] = Math.floor(args[1]);
      sql.get(`SELECT * FROM money WHERE userId ="${message.author.id}"`).then(row => {
        if(!row || row.money < args[1]){
          embed.setAuthor("SLOTS ❌", "https://i.imgur.com/lxH8qum.png")
          embed.setDescription("Vous n'avez pas assez d'Ankh, revenez plus tard !")
          return message.reply({embed});
        }else{
          if(random <= 0.6){
            embed.setAuthor("SLOTS ❌", "https://i.imgur.com/lxH8qum.png")
            embed.setDescription(symbolArray[getRandomInt(0,12)] + symbolArray[getRandomInt(0,12)] + symbolArray[getRandomInt(0,12)])
            embed.addField("Perdu !", `Vous avez perdu \`\`${args[1]}\`\`🔸 Ankh ! Vous avez \`\`${row.money - args[1]}\`\` Ankh au total.`)
            sql.run(`UPDATE money SET money = ${row.money - args[1]} WHERE userId = ${message.author.id}`)
          }else{
            let randomFruit
            if(random > 0.6 && random <= 0.85){
              rate = 2
              randomFruit = getRandomInt(0,4)
              console.log(randomFruit)
              embed.setDescription(symbolArray[randomFruit] + symbolArray[randomFruit] + symbolArray[randomFruit])
              embed.addField("Gagné !", `Vous avez gagné \`\`${args[1]*rate}\`\`🔸 Ankh, soit deux fois votre mise ! Vous avez \`\`${row.money + (args[1]*rate) - args[1]}\`\` Ankh au total.`)
            }
            if(random > 0.85 && random <= 0.95){
              rate = 3
              randomFruit = getRandomInt(5,8)
              console.log(randomFruit)
              embed.setDescription(symbolArray[randomFruit] + symbolArray[randomFruit] + symbolArray[randomFruit])
              embed.addField("Gagné !", `Vous avez gagné \`\`${args[1]*rate}\`\`🔸 Ankh, soit trois fois votre mise ! Vous avez \`\`${row.money + (args[1]*rate) - args[1]}\`\` Ankh au total.`)
            }
            if(random > 0.95 && random < 0.999){
              rate = 6
              randomFruit = getRandomInt(9,12)
              console.log(randomFruit)
              embed.setDescription(symbolArray[randomFruit] + symbolArray[randomFruit] + symbolArray[randomFruit])
              embed.addField("Gagné !", `Vous avez gagné \`\`${args[1]*rate}\`\`🔸 Ankh, soit six fois votre mise ! Vous avez \`\`${row.money + (args[1]*rate) - args[1]}\`\` Ankh au total.`)
            }
            if(random >= 0.999){
              rate = 100
              embed.setDescription("⭐⭐⭐")
              embed.addField("Gagné !", `Vous avez gagné \`\`${(args[1]*rate)}\`\`🔸 Ankh, soit CENT fois votre mise ! Vous avez \`\`${row.money + (args[1]*rate) - args[1]}\`\` Ankh au total.`)
            }
            sql.run(`UPDATE money SET money = ${row.money + (args[1]*rate) - args[1]} WHERE userId = ${message.author.id}`)
          }
          return message.reply({embed})
        }
      })
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
