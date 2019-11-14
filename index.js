
const Discord = require('discord.js')
const bot = new Discord.Client()
const sql = require('sqlite')
sql.open("./score.sqlite");

const God = require('./commands/god')
const Flip = require('./commands/flip')
const Help = require('./commands/help')
const Xp = require('./commands/xp')
const Points = require('./commands/points')
const Levels = require('./commands/levels')
const Pouvoir = require('./commands/pouvoir')
const Daily = require('./commands/daily')
const Ankh = require('./commands/ankh')
const Give = require('./commands/give')
const Reputation = require('./commands/reputation')
const Disreputation = require('./commands/disreputation')
const Leaderboard = require('./commands/leaderboard')
const Quote = require('./commands/quote')
const RandomQuote = require('./commands/randomquote')
const Blackjack = require('./commands/blackjack')
const Systemcall = require('./commands/systemcall')
const Slots = require('./commands/slots')
const UpdateUser = require('./commands/updateuser')
const PlusMinus = require('./commands/plusminus')

bot.on('message' , function(message){
    if(message.author.bot) return;
    if(message.channel.type === "dm"){
      return message.channel.send("Ma mère m'a toujours dit de pas parler aux inconnus <:RisitasNrv:298896217138790400>")
    }
    if(message.content.startsWith("$ping")){
      message.channel.send("Ta cru qu'on allait faire un tennis FDP <:RisitasNrv:298896217138790400>")
    }
    /*if(message.author.id == "140096248559435776"){
      message.delete(0);
    }*/
    Xp.parse(message);
    God.parse(message);
    Flip.parse(message);
    Help.parse(message);
    Points.parse(message);
    Levels.parse(message);
    Pouvoir.parse(message);
    Daily.parse(message);
    Ankh.parse(message);
    Give.parse(message);
    Reputation.parse(message);
    Disreputation.parse(message);
    Leaderboard.parse(message);
    Quote.parse(message);
    RandomQuote.parse(message);
    Blackjack.parse(message);
    Systemcall.parse(message);
    Slots.parse(message);
    UpdateUser.parse(message);
    PlusMinus.parse(message);
})

bot.on('ready', function(){
    //var channel = client.channels.get('my-unique-channel-id');
    bot.user.setActivity('Pharaon 2.0').catch(console.error);
})






bot.login('Insert API Token here')
