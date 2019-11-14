const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
const bot = new Discord.Client()
sql.open("./score.sqlite")

module.exports = class Blackjack extends Command{

  static match(message){
    return message.content.startsWith("$blackjack")
  }

  static action(message){
    message.reply('This is blackjack')
    bot.on('message', function(message){
      message.reply('WAITING FOR SOMETHING')
      if(message.content.startsWith("hit")){
        return message.reply("OK I HIT")
      } else if(message.content.startsWith("stay")){
        return message.reply("OK I STAY")
      } else{
        message.reply("BlouBlou")
      }
    })
  }
}
