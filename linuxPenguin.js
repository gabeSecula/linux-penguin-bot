const Discord = require('discord.js');
const config = require('config'); //https://www.npmjs.com/package/config

const client = new Discord.Client();
var exec = require('child_process').exec;

const prefix = '$';

var loginToken = config.get('token'); //Put your login token in the config file.
//https://www.npmjs.com/package/config




client.login(loginToken); //If you would like to use this program, replace loginToken with a discord bot token.

//This is the linux functionality that processes messages
function terminal(msg) {//TODO: Make the output code cleaner
  console.log(msg); //TODO: Can I possibly open a limited access shell so a group could use this?
  if (msg.content.substring(0, 1) === '$') {
    exec(msg.content.substring(1), function (error, stdout, stderr) {
      console.log('\`\`\`' + stdout + stderr + '\`\`\`');
      msg.reply('\`\`\`' + stdout + stderr + '\`\`\`');
    });
  } else {
    exec(msg.content, function (error, stdout, stderr) {
      console.log('\`\`\`' + stdout + stderr + '\`\`\`');
      msg.channel.send('\`\`\`' + stdout + stderr + '\`\`\`');
    });
  }
}

//Runs when the bot successfully logs in
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //client.user.setGame(`You need help?`);
});


//Message handler
client.on('message', msg => {
  if ((msg.channel.type === 'dm') && (!msg.author.bot)) { //In DMs, the message author does not need to include the '$' prefix before commands.
    terminal(msg);
  } else if (msg.content.substring(0, 1) === '$') {
    terminal(msg);
  }
});
