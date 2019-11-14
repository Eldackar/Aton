const Command = require('./command')
const sql = require('sqlite')
sql.open("./score.sqlite");

module.exports = class Levels extends Command{

    static match(message){
      return message.content.startsWith('$levels');
    }

    static action(message){
      sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) return message.reply("T\'es au \`\`niveau 0\`\`, t'es vraiment bas de gamme comme type c'est ouf <:Risitas2:280120484572692480>");
        message.reply(`T\'es au \`\`niveau ${row.level}\`\`, c'est quand même bien de la merde on va pas se le cacher <:Risitas2:280120484572692480>`);
      });
    }
}
