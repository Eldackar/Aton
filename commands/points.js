const Command = require('./command')
const sql = require('sqlite')
sql.open("./score.sqlite");

module.exports = class Points extends Command{

    static match(message){
      return message.content.startsWith('$points');
    }

    static action(message){
      sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) return message.reply('T\'as pas encore de points, t\'es vraiment un proletaire !  <:Jesus4:280120629338832896>');
        message.reply(`Vous avez actuellement ${row.points} points divins <:RisiMoine:294834771513704448>`);
      });
    }
}
