const Discord = require('discord.js');
var exec = require('child_process').exec;
const client = new Discord.Client();
const prefix = '$';
var lotteryChannel;



var config = require('config'); 
var loginToken = config.get('login'); //Put your login token in the config file.
//https://www.npmjs.com/package/config
//need to run: npm install config
//Add gitignore for config
client.login(loginToken); //Log into Discord *XBox ON, bring up domino's website*

//This is the linux functionality
function terminal(msg) {
  console.log(msg); //Spawn a child process idiot
  if(msg.content.substring(0,1) === '$') {
    exec(msg.content.substring(1), function(error, stdout, stderr) {
      console.log('\`\`\`' + stdout + stderr + '\`\`\`');
      msg.reply('\`\`\`' + stdout + stderr + '\`\`\`');
    });
  } else {
    exec(msg.content, function(error, stdout, stderr) {
      console.log('\`\`\`' + stdout + stderr + '\`\`\`');
      msg.channel.send('\`\`\`' + stdout + stderr + '\`\`\`');
    });
  }
}

//Runs when the bot successfully logs in
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`You need help?`);
});

//Message handler
client.on('message', msg => {
  if ((msg.channel.type === 'dm')&&(!msg.author.bot)) {
    terminal(msg);
  } else if (msg.content.substring(0,1) === '&') {
	  if (msg.content === '&setLotteryChannel') {
		  setLotteryChannel(msg);
          } else if (msg.content === '&lottery') {
		  lottery(msg);
	  }
  }  else if (msg.content.substring(0,1) === '$'){
      terminal(msg);

  }
});
