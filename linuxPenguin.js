const Discord = require('discord.js');
var exec = require('child_process').exec;
const client = new Discord.Client();
const prefix = '$';

//login with discord API secret token
client.login('MzI3NDgyMTQyMzYxOTExMjk2.DC3htw.7wPGU66xGpW-nbGHynOolyvUBKw');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`Linux Lords need no help.`);
});

client.on('message', msg => {
  if (msg.content.substring(0,1) === '$') {
    exec(msg, function(error, stdout, stderr) {
    msg.reply('```'+stdout+'```');

    });
  }
});
