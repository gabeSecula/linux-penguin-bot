const Discord = require('discord.js');
var exec = require('child_process').exec;
const client = new Discord.Client();
const prefix = '$';


client.login('MzI3NDgyMTQyMzYxOTExMjk2.DC3htw.7wPGU66xGpW-nbGHynOolyvUBKw');

function terminal(msg) {
  //idk what the fuck to do yet
  exec(msg.content, function(error, stdout, stderr) {
  msg.reply('```' + stdout + stderr + ' ``` ');
  });
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`Linux Lords need no help.`);
});

client.on('message', msg => {
  if ((msg.channel.type === 'dm')&&(!msg.author.bot)) {
    terminal(msg); //this should start a session that stops doing the reply bullshit
  } else if (msg.content.substring(0,1) === '$') {
    exec(msg.content.substring(1), function(error, stdout, stderr) {
    msg.reply('```' + stdout + stderr + ' ``` ');
    });
  }
});
