const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite")

module.exports = class PlusMinus extends Command{

  static match(message){
    return message.content.startsWith('$plusminus')
  }

  static action(message){

    const embed = new Discord.RichEmbed()
    .setAuthor("PLUSMINUS ✔️", "https://i.imgur.com/lxH8qum.png")
    .setColor("#FFD708")
    .setDescription("This is the main body of text, it can hold 2048 characters.")

    let rng = entierAleatoire(0, 100);
    let args = message.content.split(' ');

    if(args[1] == "reminder"){
      sql.get(`SELECT * FROM plusMinus WHERE userId=${message.author.id}`).then(row =>{
        if(!row){
          embed.setDescription("Vous n'avez pas de partie en cours !")
          return message.reply({embed})
        }
        else{
          embed.setDescription(`Il vous reste \`\`${row.chances}\`\` chances et le numero se trouve entre \`\`${row.borne1}\`\` et \`\`${row.borne2}\`\` !`)
          return message.reply({embed})
        }
      })
    } else if(!isNaN(args[1]) && !isNaN(args[2])){
        sql.get(`SELECT * FROM plusMinus WHERE userId=${message.author.id}`).then(row =>{
          sql.get(`SELECT * FROM money WHERE userId ="${message.author.id}"`).then(row2 =>{
            if(args[1] > row2.money){
              embed.setDescription("Vous n'avez pas assez d'Ankh, revenez plus tard !")
              return message.reply({embed})
            } else if(args[2] <= 0 || args[2] > 100){
                embed.setDescription("Le nombre choisit est incorrect !")
                return message.reply({embed})
            }else{
                if(!row){
                  let rng = entierAleatoire(0,100)
                  if(rng > args[2]){
                    sql.run("INSERT INTO plusMinus (userId, rng, chances, borne1, borne2) VALUES (?, ?, ?, ?, ?)", [message.author.id, rng, 4, args[2], 100])
                  } else if(rng < args[2]){
                    sql.run("INSERT INTO plusMinus (userId, rng, chances, borne1, borne2) VALUES (?, ?, ?, ?, ?)", [message.author.id, rng, 4, 0, args[2]])
                  } else if(rng == args[2]){
                    // C'est gagné
                  }
                } else{
                  embed.setDescription("Vous avez déja une partie en cours !")
                  return message.reply({embed})
                }
            }
          });
        });
      }
    }
  }

function entierAleatoire(min, max){
 return Math.floor(Math.random() * (max - min + 1) + min);
}
