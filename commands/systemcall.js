const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite")

module.exports = class Systemcall extends Command{

  static match(message){
    return message.content.startsWith("$systemcall")
  }

  static action(message){

    let args = message.content.split(' ')

    if(message.author.id == "246759454480138241"){
      if(args[1] == "deleteChannel"){
        return message.channel.delete()
      }

      if(args[1] == "createChannel"){
        return message.guild.createChannel(args[2], 'text')
      }

      if(args[1] == "showRoles"){
        return console.log(message.guild.roles.array())
      }

      if(args[1] == "unjail"){
        let idMention = message.mentions.members.first()
        return idMention.setRoles(['502055001254789120'])
      }

      if(args[1] == "setAnkhStreak"){
        let idMention = message.mentions.members.first()
        sql.get(`SELECT * FROM money WHERE userId ="${message.author.id}"`).then(row => {
          sql.run(`UPDATE money SET money = ${row.money + (25*(args[3]))}, date = ${uneDate.toString().substring(0, 10)}, streak = ${args[3]} WHERE userId = ${idMention}`);
        }).catch(() => {
          console.error;
        });
      }
    }
  }
}
