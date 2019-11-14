const Command = require ('./command')
const sql = require('sqlite')
sql.open("./score.sqlite");

module.exports = class Xp extends Command{

    static match(message){
      return message.content;
    }

    static action(message){

      sql.all(`SELECT * FROM quote`).then(row => {
        //nothing there
      }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS quote (date TEXT, guildId TEXT, content TEXT, auteur TEXT)")
      })

      sql.all(`SELECT * FROM plusMinus`).then(row => {
        //nothing there
      }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS plusMinus (userId TEXT, rng TEXT, chances TEXT, borne1 TEXT, borne2 TEXT)")
      })

      sql.all(`SELECT * FROM stats`).then(row => {
        //nothing there
      }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS stats (pile TEXT, face TEXT)")
      })

      sql.get(`SELECT * FROM money WHERE userId = "${message.author.id}"`).then(rowMoney => {
        if(!rowMoney){
          sql.run("INSERT INTO money (userId, money, date, streak) VALUES (?, ?, ?, ?)", [message.author.id, 0, 0, 1]);
        }
      }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS money (userId TEXT, money INTEGER, date INTEGER, streak INTEGER)")
      })


      sql.get(`SELECT * FROM username WHERE userId = "${message.author.id}"`).then(rowMoney => {
        if(!rowMoney){
          sql.run("INSERT INTO username (userId, username) VALUES (?, ?)", [message.author.id, message.author.username]);
        }
      }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS money (userId TEXT, money INTEGER, date INTEGER, streak INTEGER)")
      })


      sql.get(`SELECT * FROM reputation WHERE userId ="${message.author.id}"`).then( rowReputation => {
        if(!rowReputation){
          sql.run("INSERT INTO reputation (userId, reputation, repRemaining, disrepRemaining, dateDisrep, dateRep) VALUES (?, ?, ?, ?, ?, ?)", [message.author.id, 0, 3, 1, Math.floor((Date.now()/1000) + 79200), Math.floor((Date.now()/1000) + 79200)]);
        }
      }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS reputation (userId TEXT, reputation INTEGER, repRemaining INTEGER, disrepRemaining INTEGER, dateDisrep INTEGER, dateRep INTEGER)");
      })


      sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
        } else {
          let curLevel = Math.floor(0.2 * Math.sqrt(row.points + 1));
          console.log(message.author.username)
          console.log(curLevel)
          console.log("#######")
          console.log(row.level)
          if (curLevel > row.level) {
            row.level = curLevel;
            sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
            message.reply(`Bravo le dechet t'es monté au level **${curLevel}**! Mais t'es pas encore à mon level de DIEU <:RisitasMouchoir:412369988863787019>`);
          }
          sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
        }
      }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)")
      });
    }
}
