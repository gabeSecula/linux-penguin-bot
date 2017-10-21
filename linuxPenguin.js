const Discord = require('discord.js');
var exec = require('child_process').exec;
const client = new Discord.Client();
const prefix = '$';
var lotteryChannel;

client.login('MzI3NDgyMTQyMzYxOTExMjk2.DC3htw.7wPGU66xGpW-nbGHynOolyvUBKw');

//This is the linux functionality
function terminal(msg) {
  console.log(msg);
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

//Function to set the lottery text channel
function setLotteryChannel(msg) {
	lotteryChannel = msg.channel;
	msg.channel.send(lotteryChannel.toString() + " has been set as the Lottery Channel");
}

//Function to run the lottery
function lottery(msg) {
  /*
    This is super primitive, a future iteration will only accept entries with a
  prefix and will check things like multiple submissions from the same account.
  I'm not sure if we want to make it so it's always running and checking
  messages in that channel or if we can make it read past messages and parse
  properly.
  */
	var lotteryArray = lotteryChannel.messages.array();
	msg.reply(lotteryArray);
}

//Runs when the bot successfully logs in
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`Linux Lords need no help.`);
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
