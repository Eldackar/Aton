const Command = require('./command')
const sql = require('sqlite')
const Discord = require('discord.js')
sql.open("./score.sqlite");

module.exports = class Daily extends Command{

  static match(message){
    return message.content.startsWith('$daily');
  }

  static action(message){
    let uneDate = Date.now();
    console.log(uneDate.toString().substring(0, 10));

    const embed = new Discord.RichEmbed()
    .setAuthor("DAILY ✔️","https://i.imgur.com/lxH8qum.png")
    /*
    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
    */
    .setColor("#FFD708")
    .setDescription("This is the main body of text, it can hold 2048 characters.")

    sql.get(`SELECT * FROM money WHERE userId ="${message.author.id}"`).then(row => {
      let targetDate = row.date + 79200;
      if(Math.floor(Date.now() / 1000) > targetDate){
        let targetDateResetStreak = row.date + 129600;
        if(Math.floor(Date.now() / 1000) > targetDateResetStreak){
          sql.run(`UPDATE money SET money = ${100 + row.money}, date = ${uneDate.toString().substring(0, 10)}, streak = ${0} WHERE userId = ${message.author.id}`);
          console.log("Streak OFF");
          embed.setDescription(`Wow, \`\`100\`\` ANKH ajoutés à ton compte pour un total de \`\`${100 + row.money}\`\` Ankh. Ton Ankhstreak est à \`\`0\`\`, reviens demain ! `);
          return message.reply({embed});
        }else{
          sql.run(`UPDATE money SET money = ${100 + (25*(row.streak+1)) + row.money}, date = ${uneDate.toString().substring(0, 10)}, streak = ${row.streak + 1} WHERE userId = ${message.author.id}`);
          console.log("Streak OK")
          embed.setDescription(`Wow, \`\`${100 + (25*(row.streak+1))}\`\` Ankh ajoutés à ton compte pour un total de \`\`${100 + (25*(row.streak+1)) + row.money}\`\` Ankh. Ton Ankhstreak est à \`\`${row.streak + 1}\`\`, reviens demain ! `)
          return message.reply({embed});
        }
      }else{
        let timeRemaining = new Date((targetDate*1000) - uneDate);
        console.log(timeRemaining);
        var hours = timeRemaining.getHours();
        var minutes = timeRemaining.getMinutes();
        var seconds = timeRemaining.getSeconds();
        //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        embed.setDescription(`Essaye pas de m'arnaquer t'as deja fait ton daily aujourd'hui ! Reviens dans \`\`${hours} heures, ${minutes} minutes, et ${seconds} secondes\`\` pour recevoir ton Daily.`)
        embed.setAuthor("DAILY ❌" , "https://i.imgur.com/lxH8qum.png")
        embed.setColor("#FF0000")
        return message.reply({embed});
      }
    }).catch(() => {
      console.error;
    });
  }
}
